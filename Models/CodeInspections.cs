using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Models
{
    public class CodeInspections
    {
        public int Id { get; set; }
        public int Errors { get; set; }
        public int Warnings { get; set; }
        //FK : Build
        public Build Build { get; set; }
        public int BuildFK { get; set; }
    }
}
