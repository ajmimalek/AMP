using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Models
{
    public class BuildStageDuration
    {
        [ForeignKey("Build")]
        [JsonIgnore] public int Id { get; set; }
        public int FirstStepPrep { get; set; }
        public int SourceUpdate { get; set; }
        public int ToolsUpdating { get; set; }
        public int BStepRunner_11 { get; set; }
        public int BStepRunner_12 { get; set; }
        public int BuildFinish { get; set; }
        public int ArtifactPublishing { get; set; }
        //FK : Build
        [JsonIgnore] public Build Build { get; set; }
        [JsonIgnore] public int BuildFK { get; set; }
    }
}
