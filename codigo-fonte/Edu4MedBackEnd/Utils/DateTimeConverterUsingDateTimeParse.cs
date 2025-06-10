using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

public class DateTimeConverterUsingDateTimeParse : JsonConverter<DateTime>
{
    private static readonly string[] acceptedFormats = new[]
    {
        "yyyy-MM-dd",
        "dd/MM/yyyy",
        "MM/dd/yyyy"
    };

    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var value = reader.GetString();

        if (DateTime.TryParseExact(value, acceptedFormats, CultureInfo.InvariantCulture,
            DateTimeStyles.None, out DateTime parsedDate))
        {
            return DateTime.SpecifyKind(parsedDate, DateTimeKind.Utc);
        }

        throw new JsonException($"Formato de data inválido: '{value}'. Formatos esperados: {string.Join(", ", acceptedFormats)}.");
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        var utcDate = value.ToUniversalTime(); // Garante UTC
        writer.WriteStringValue(utcDate.ToString("yyyy-MM-dd"));
    }
}
