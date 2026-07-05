using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class GeoLocationDto
    {
        public string Name { get; set; } = string.Empty;
        public double Lat { get; set; }
        public double Lon { get; set; }
    }
}