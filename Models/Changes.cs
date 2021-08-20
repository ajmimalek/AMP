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
        public ICollection<Files> files { get; set; }
        //FK : Build
        public Build Build { get; set; }
        public int BuildFK { get; set; }

        public Changes(int id, string userName, string comment)
        {
            Id = id;
            UserName = userName;
            Comment = comment;
        }
    }
}
