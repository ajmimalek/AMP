using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Models
{
    public class Files
    {
        [JsonIgnore] public int Id { get; set; }
        public string Name { get; set; }
        public string ChangeType { get; set; }
        //FK : Changes
        [JsonIgnore] public Changes Changes { get; set; }
        [JsonIgnore] public int ChangesFK { get; set; }

        //Constructor
        public Files(string name, string changeType)
        {
            Name = name;
            ChangeType = changeType;
        }
    }
}
