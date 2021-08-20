using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Models
{
    public class CodeInspections
    {
        [ForeignKey("Build")]
        [JsonIgnore] public int Id { get; set; }
        public int Errors { get; set; }
        public int Warnings { get; set; }
        //FK : Build
        [JsonIgnore] public Build Build { get; set; }
        [JsonIgnore] public int BuildFK { get; set; }
    }
}
