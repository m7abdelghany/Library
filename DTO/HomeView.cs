using Microsoft.AspNetCore.Mvc;

namespace Library.DTO
{
    public class HomeView
    {
        
        public string BookName { get; set; }
        public FileContentResult Image { get; set; }
        public float Rating { get; set; }
    }
}
