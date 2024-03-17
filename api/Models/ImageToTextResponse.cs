namespace api.Models;

public class ImageToTextResponse
{
    public string analysisResult { get; set; }
}
public class CaptionResult
{
    public string Text { get; set; }
    public double Confidence { get; set; }
}

public class Metadata
{
    public int Width { get; set; }
    public int Height { get; set; }
}

public class Word
{
    public string Text { get; set; }
    public double Confidence { get; set; }
    // Add more properties as needed
}

public class Line
{
    public string Text { get; set; }
    public List<Word> Words { get; set; }
    // Add more properties as needed
}

public class Block
{
    public List<Line> Lines { get; set; }
    // Add more properties as needed
}

public class ReadResult
{
    public List<Block> Blocks { get; set; }
}

public class AnalysisResult
{
    public string ModelVersion { get; set; }
    public CaptionResult CaptionResult { get; set; }
    public Metadata Metadata { get; set; }
    public ReadResult ReadResult { get; set; }
}
