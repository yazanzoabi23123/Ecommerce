using System.ComponentModel.DataAnnotations;

namespace E_commerce.Models.Users
{
    public class Image
    {
        [Url]
        public string Url { get; set; }
        public string Alt { get; set; }

    }
}
