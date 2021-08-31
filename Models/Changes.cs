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
        public int AddedFiles { get; set; }
        public int EditedFiles { get; set; }
        public int DeletedFiles { get; set; }
        //FK : Files
        public List<Files> files { get; set; }
        //FK : Build
        [JsonIgnore] public Build Build { get; set; }
        [JsonIgnore] public int BuildFK { get; set; }

        public Changes()
        {

        }
        //Constructor
        public Changes(int id, string userName, string comment)
        {
            Id = id;
            UserName = userName;
            Comment = comment;
            AddedFiles = 0;
            EditedFiles = 0;
            DeletedFiles = 0;
        }
    }
}
