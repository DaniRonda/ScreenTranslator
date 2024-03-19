using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly ImageTextTranslationService _imageService;

        public ImageController(ImageTextTranslationService imageService)
        {
            _imageService = imageService;
        }

        [HttpPost("TranslateImage")]
        public async Task<IActionResult> TranslateImage([FromBody] ImageTranslationRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Content))
            {
                return BadRequest("Invalid image URL.");
            }

            try
            {
                var translation = await _imageService.AnalyzeImageAsync(request.Content, request.TargetLanguage);
                return Ok(new { translation });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
