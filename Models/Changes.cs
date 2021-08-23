using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Models
{
    public class Changes
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public DateTime DateChange { get; set; }
        public string Comment { get; set; }
        //FK : Files
        public List<Files> files { get; set; }
        //FK : Build
        [JsonIgnore] public Build Build { get; set; }
        [JsonIgnore] public int BuildFK { get; set; }

        //Constructor
        public Changes(int id, string userName, string comment)
        {
            Id = id;
            UserName = userName;
            Comment = comment;
        }
    }
}
