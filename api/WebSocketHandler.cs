using System.Net.WebSockets;
using System.Text;
using api.Models;
using Newtonsoft.Json;

namespace api
{
    public class WebSocketHandler
    {
        public async Task HandleWebSocketAsync(HttpContext context)
        {
            if (context.WebSockets.IsWebSocketRequest)
            {
                using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
                
                await ReceiveMessage(webSocket, async (result, buffer) =>
                {
                    switch (result.MessageType)
                    {
                        case WebSocketMessageType.Text:
                            var requestJson = Encoding.UTF8.GetString(buffer.Array, buffer.Offset, result.Count);
                            var request = JsonConvert.DeserializeObject<TranslationRequest>(requestJson);
                            
                            var translator = new AzureTranslator(request.TargetLanguage, request.Content, new HttpClient()); 
                            var translationResult = await translator.TranslateAsync();
                            
                            var responseJson = Encoding.UTF8.GetBytes(translationResult);
                            await webSocket.SendAsync(new ArraySegment<byte>(responseJson, 0, responseJson.Length), WebSocketMessageType.Text, true, CancellationToken.None);
                            break;

                        case WebSocketMessageType.Close:
                            await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
                            break;

                        case WebSocketMessageType.Binary:
                            await webSocket.CloseAsync(WebSocketCloseStatus.InvalidMessageType, "Binary messages are not supported.", CancellationToken.None);
                            break;
                    }
                });
            }
            else
            {
                context.Response.StatusCode = 400;
            }
        }

        private async Task ReceiveMessage(WebSocket socket, Func<WebSocketReceiveResult, ArraySegment<byte>, Task> handleMessage)
        {
            var buffer = new ArraySegment<byte>(new byte[2048]);
            while (socket.State == WebSocketState.Open)
            {
                var result = await socket.ReceiveAsync(buffer, CancellationToken.None);
                if (result.MessageType == WebSocketMessageType.Close)
                {
                    break;
                }
                await handleMessage(result, buffer);
            }
        }
    }
}
