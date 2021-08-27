﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Models
{
    public class User
    {
        // JsonIgnore : Not sending password in JSON
        [Key]
        public Guid Id { get; set; }
        public string UserName { get; set; }
        [Required(ErrorMessage = "Password is required")] 
        [DataType(DataType.Password)]
        [RegularExpression("^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{8,}$"
            , ErrorMessage = "Passwords must be at least 8 characters and contain at 3 of 4 of the following: upper case (A-Z), lower case (a-z), number (0-9) and special character (e.g. !@#$%^&*)")]
        [JsonIgnore] public string Password { get; set; }
        [NotMapped] //Confirm Password will not be added to DB
        [Required(ErrorMessage = "Confirm Password is required")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Password and Confirmation Password must match.")]
        [JsonIgnore] public string ConfirmPassword { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Avatar { get; set; }
        public string Name { get; set; }
    }
}
