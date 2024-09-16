using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServiceCatelogue__Service.Models
{
    public class ServiceDetails
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; } 

        [Required]
        public string CompanyName { get; set; }
        [Required]
        public string CompanyEmail { get; set; }
        [Required]
        public string CompanyPhone { get; set; }
        [Required]
        public string Location { get;set; }
        [Required]
        public string LocationCity { get; set; }
        [Required]
        public string Specialist { get; set; }
        [Required]
        public string Services { get; set; }

        [Required]
        public string ImageName { get; set; }

        [Required]
        public string Type { get; set; }

        
    }
}
