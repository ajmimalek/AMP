using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Models
{
    public class Build
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }
        public string Status { get; set; }
        public string State { get; set; }
        public string BranchName { get; set; }
        public string WebURL { get; set; }
        public string Description { get; set; }
        public string WaitingTime { get; set; }
        public string ExecutionTime { get; set; }
        public int Duration { get; set; }
        public int DurationNetTime { get; set; }
        public int ArtifactSize { get; set; }
        public int VisibleArtificatSize { get; set; }
        //FK : BuildStageDuration
        public BuildStageDuration BuildStage { get; set; }
        //FK : CodeCoverage
        public CodeCoverage CodeCoverage { get; set; }
        //FK : CodeInspections
        public CodeInspections CodeInspections { get; set; }
        //FK : Changes
        public ICollection<Changes> Changes { get; set; }
        //FK : Tests
        public ICollection<Tests> Tests { get; set; }
        
        public Build(int id, string number, string status, string state, string branchName, string webURL, string description, string name)
        {
            Id = id;
            Number = number;
            Status = status;
            State = state;
            BranchName = branchName;
            WebURL = webURL;
            Description = description;
            Name = name;
        }

        public Build()
        {
        }
    }
}
