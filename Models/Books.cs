﻿using System.ComponentModel.DataAnnotations;

namespace Library.Models
{
    public class Books
    {
        [Key]
        public int BookId { get; set; }
        public string Name { get; set; }
        public string Cataegory { get; set; }
        public byte[] Data { get; set; }
    }
}
