namespace api.Models;

public class TranslationResponse
{
    public DetectedLanguage DetectedLanguage { get; set; }
    public Translation[] Translations { get; set; }
}