﻿using System.ComponentModel.DataAnnotations;

namespace ContactManagementSys.Models
{
    public class Users
    {
        [Key]
        public int userId { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }

    }
}
