using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Models
{
    public class CodeCoverage
    {
        [ForeignKey("Build")]
        [JsonIgnore] public int Id { get; set; }
        public int ClassCovered { get; set; }
        public int ClassNonCovered { get; set; }
        public int ClassTotal { get; set; }
        public double ClassPercent { get; set; }
        public int MethodCovered { get; set; }
        public int MethodNonCovered { get; set; }
        public int MethodTotal { get; set; }
        public double MethodPercent { get; set; }
        public int StatementCovered { get; set; }
        public int StatementNonCovered { get; set; }
        public int StatementTotal { get; set; }
        public double StatementPercent { get; set; }
        //FK : Build
        [JsonIgnore] public Build Build { get; set; }
        [JsonIgnore] public int BuildFK { get; set; }
    }
}
