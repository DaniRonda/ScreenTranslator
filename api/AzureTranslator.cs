using System.Text;
using api.Models;
using Newtonsoft.Json;

namespace api;

public class AzureTranslator
{
    private readonly string _language;
    private readonly string _content;
    private readonly HttpClient _client;

    private static readonly string Key = Environment.GetEnvironmentVariable("translatorKey")!;
    private const string Endpoint = "https://api.cognitive.microsofttranslator.com/";
    private const string Location = "northeurope";

    public AzureTranslator(string language, string content, HttpClient client)
    {
        _language = language;
        _content = content;
        _client = client;
    }

    public async Task<string> TranslateAsync()
    {
        var route = $"/translate?api-version=3.0&to={_language}";
        var requestBody = JsonConvert.SerializeObject(new[] { new { Text = _content } });

        using var request = new HttpRequestMessage();
        request.Method = HttpMethod.Post;
        request.RequestUri = new Uri(Endpoint + route);
        request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
        request.Headers.Add("Ocp-Apim-Subscription-Key", Key);
        request.Headers.Add("Ocp-Apim-Subscription-Region", Location);

        var response = await _client.SendAsync(request).ConfigureAwait(false);
        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadAsStringAsync();
        var translationResult = JsonConvert.DeserializeObject<TranslationResponse[]>(result);

        if (translationResult is { Length: > 0 })
        {
            var translatedText = translationResult[0].Translations[0];
            var jsonResponse = JsonConvert.SerializeObject(new { translation = translatedText });
            return jsonResponse;
        }
        else
        {
            throw new InvalidOperationException("No translation result found.");
        }
    }
}