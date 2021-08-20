using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Models
{
    public class Files
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ChangeType { get; set; }
        //FK : Changes
        public Changes Changes { get; set; }
        public int ChangesFK { get; set; }
    }
}
