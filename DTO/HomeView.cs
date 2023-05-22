using Microsoft.AspNetCore.Mvc;

namespace Library.DTO
{
    public class HomeView
    {

        public string BookName { get; set; }
        public string Image { get; set; }
        public float Rating { get; set; }
        public string Description { get; set; }
    }
}
