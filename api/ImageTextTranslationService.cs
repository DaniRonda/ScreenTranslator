using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using api.Models;
using Newtonsoft.Json;

namespace api
{
    public class ImageTextTranslationService
    {
        private readonly HttpClient _httpClient;
        private readonly string _computerVisionKey = "79c6012f730f4f538aa34cac895c0920";
        
        public ImageTextTranslationService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri("https://imagetotextproject.cognitiveservices.azure.com/");
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", _computerVisionKey);
        }

        public async Task<string> AnalyzeImageAsync(string imageUrl, string targetLanguage)
        {
            var requestUri = "/computervision/imageanalysis:analyze?features=caption,read&model-version=latest&language=en&api-version=2024-02-01";

            var requestBody = new StringContent(JsonConvert.SerializeObject(new { url = imageUrl }), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(requestUri, requestBody);
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            var analysisResult = JsonConvert.DeserializeObject<AnalysisResult>(responseContent);

            var text = GetTextFromReadResult(analysisResult.ReadResult);

            var translator = new AzureTranslator(targetLanguage, text, _httpClient);
            var translationJson = await translator.TranslateAsync();
            return translationJson;
        }




        private string GetTextFromReadResult(ReadResult readResult)
        {
            var stringBuilder = new StringBuilder();

            foreach (var block in readResult.Blocks)
            {
                foreach (var line in block.Lines)
                {
                    foreach (var word in line.Words)
                    {
                        stringBuilder.Append(word.Text).Append(" ");
                    }
                }
            }

            return stringBuilder.ToString().Trim();
        }

    }
}
