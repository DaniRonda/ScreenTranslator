using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TranslationController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public TranslationController(IHttpClientFactory httpClientFactory)
    {
        _httpClient = httpClientFactory.CreateClient();
    }

    [HttpPost("Translate")]
    public async Task<IActionResult> Translate([FromBody] TranslationRequest? request)
    {
        if (request == null || string.IsNullOrWhiteSpace(request.Content) || string.IsNullOrWhiteSpace(request.TargetLanguage))
        {
            return BadRequest("Invalid request.");
        }

        var translator = new AzureTranslator(request.TargetLanguage, request.Content, _httpClient);
        try
        {
            var translationResult = await translator.TranslateAsync();
            return Ok(translationResult);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

}