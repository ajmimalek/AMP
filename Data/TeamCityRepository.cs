using AMP.API_Models;
using AMP.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace AMP.Data
{
    public class TeamCityRepository : ITeamCityRepository
    {
        //Injection de dépandances
        private readonly AMPContext _context;
        //TeamCity Base URL : to place in appsettings.json
        public static string BASE_URI = "https://bs1amptcs01.ad.linedata.com/app/rest";
        //to place in appsettings.json
        public static string TOKEN = "eyJ0eXAiOiAiVENWMiJ9.eExaaEEtWFRpQWRzOUpsRV9iaURUT0daV0Nn.NTgwOTIzYmQtNzI1NC00NTVhLWE2ZjgtMWI1MDVlOTQ1MDZl";
        HttpClient httpClient;

        //Constructor
        public TeamCityRepository(AMPContext context)
        {
            _context = context;
            httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri(BASE_URI);
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            httpClient.DefaultRequestHeaders.Add("Authorization", string.Format("Bearer {0}", TOKEN));
        }

        public Build GetBuildById(int id)
        {
            Build build;
            var response = httpClient.GetAsync(BASE_URI + "/builds/" + id.ToString() + "?fields=id,number,status,state,branchName,webUrl,statusText,queuedDate,startDate,finishDate,buildType(name),lastChanges(change(id))").Result;
            if (response.IsSuccessStatusCode)
            {
                var BuildResponse = response.Content.ReadAsStringAsync().Result;
                BuildDetails BuildInfos = JsonConvert.DeserializeObject<BuildDetails>(BuildResponse);
                build = new Build(BuildInfos.id, BuildInfos.number, BuildInfos.status, BuildInfos.state, BuildInfos.branchName, BuildInfos.webUrl, BuildInfos.statusText, BuildInfos.buildType.name, BuildInfos.lastChanges.change[0].id);
                TimeSpan waiting = DateTime.ParseExact(BuildInfos.startDate, "yyyyMMdd'T'HHmmsszzz", CultureInfo.InvariantCulture) - DateTime.ParseExact(BuildInfos.queuedDate, "yyyyMMdd'T'HHmmsszzz", CultureInfo.InvariantCulture);
                TimeSpan exec = DateTime.ParseExact(BuildInfos.finishDate, "yyyyMMdd'T'HHmmsszzz", CultureInfo.InvariantCulture) - DateTime.ParseExact(BuildInfos.startDate, "yyyyMMdd'T'HHmmsszzz", CultureInfo.InvariantCulture);
                build.WaitingTime = waiting.ToString();
                build.ExecutionTime = exec.ToString();
                var Statresponse = httpClient.GetAsync(BASE_URI + "/builds/id:" + id + "/statistics").Result;
                if (Statresponse.IsSuccessStatusCode)
                {
                    var BuildStatResponse = Statresponse.Content.ReadAsStringAsync().Result;
                    BuildStats stats = JsonConvert.DeserializeObject<BuildStats>(BuildStatResponse);
                    foreach (var property in stats.property)
                    {
                        if (property.name.Equals("BuildDuration"))
                        {
                            build.Duration = int.Parse(property.value);
                        }
                        if (property.name.Equals("BuildDurationNetTime"))
                        {
                            build.DurationNetTime = int.Parse(property.value);
                        }
                        if (property.name.Equals("ArtifactsSize"))
                        {
                            build.ArtifactSize = int.Parse(property.value);
                        }
                        if (property.name.Equals("VisibleArtifactsSize"))
                        {
                            build.VisibleArtificatSize = int.Parse(property.value);
                        }
                    }
                }
                return build;
            }
            return null;
        }

        public Changes GetBuildChanges(int id)
        {
            Build build = GetBuildById(id);
            Changes changes;
            Models.Files file;
            var response = httpClient.GetAsync(BASE_URI + "/changes/id:" + build.LastChangeId.ToString() + "?fields=id,username,date,webUrl,comment,files(file(file,changeType))").Result;
            if (response.IsSuccessStatusCode)
            {
                var Response = response.Content.ReadAsStringAsync().Result;
                ChangesDetails changesDetails = JsonConvert.DeserializeObject<ChangesDetails>(Response);
                changes = new Changes(changesDetails.id, changesDetails.username, changesDetails.comment);
                changes.files = new List<Models.Files>();
                for (int i = 0; i < changesDetails.files.file.Length; i++)
                {
                    file = new Models.Files(changesDetails.files.file[i].file, changesDetails.files.file[i].changeType);
                    changes.files.Add(file);
                }
                return changes;
            }
            return null;
        }

        public BuildStageDuration GetBuildDuration(int id)
        {
            BuildStageDuration buildDuration = new BuildStageDuration();
            var Statresponse = httpClient.GetAsync(BASE_URI + "/builds/id:" + id + "/statistics").Result;
            if (Statresponse.IsSuccessStatusCode)
            {
                var BuildStatResponse = Statresponse.Content.ReadAsStringAsync().Result;
                BuildStats stats = JsonConvert.DeserializeObject<BuildStats>(BuildStatResponse);
                foreach (var property in stats.property)
                {
                    if (property.name.Equals("buildStageDuration:firstStepPreparation"))
                    {
                        buildDuration.FirstStepPrep = int.Parse(property.value);
                    }
                    if (property.name.Equals("buildStageDuration:sourcesUpdate"))
                    {
                        buildDuration.SourceUpdate = int.Parse(property.value);
                    }
                    if (property.name.Equals("buildStageDuration:toolsUpdating"))
                    {
                        buildDuration.ToolsUpdating = int.Parse(property.value);
                    }
                    if (property.name.Equals("buildStageDuration:buildStepRUNNER_11"))
                    {
                        buildDuration.BStepRunner_11 = int.Parse(property.value);
                    }
                    if (property.name.Equals("buildStageDuration:buildStepRUNNER_12"))
                    {
                        buildDuration.BStepRunner_12 = int.Parse(property.value);
                    }
                    if (property.name.Equals("buildStageDuration:buildFinishing"))
                    {
                        buildDuration.BuildFinish = int.Parse(property.value);
                    }
                    if (property.name.Equals("buildStageDuration:artifactsPublishing"))
                    {
                        buildDuration.ArtifactPublishing = int.Parse(property.value);
                    }
                }
            }
            return buildDuration;
        }
        public Tests GetBuildTests(int id)
        {
            throw new NotImplementedException();
        }

        public CodeCoverage GetCodeCoverage(int id)
        {
            CodeCoverage codeCoverage = new CodeCoverage();
            var Statresponse = httpClient.GetAsync(BASE_URI + "/builds/id:" + id + "/statistics").Result;
            if (Statresponse.IsSuccessStatusCode)
            {
                var BuildStatResponse = Statresponse.Content.ReadAsStringAsync().Result;
                BuildStats stats = JsonConvert.DeserializeObject<BuildStats>(BuildStatResponse);
                foreach (var property in stats.property)
                {
                    if (property.name.Equals("CodeCoverageAbsCCovered"))
                    {
                        codeCoverage.ClassCovered = int.Parse(property.value);
                    }
                    if (property.name.Equals("CodeCoverageAbsCTotal"))
                    {
                        codeCoverage.ClassTotal = int.Parse(property.value);
                    }
                    if (property.name.Equals("CodeCoverageC"))
                    {
                        codeCoverage.ClassPercent = double.Parse(property.value, CultureInfo.InvariantCulture);
                    }
                    codeCoverage.ClassNonCovered = codeCoverage.ClassTotal - codeCoverage.ClassCovered;
                    //Method
                    if (property.name.Equals("CodeCoverageAbsMCovered"))
                    {
                        codeCoverage.MethodCovered = int.Parse(property.value);
                    }
                    if (property.name.Equals("CodeCoverageAbsMTotal"))
                    {
                        codeCoverage.MethodTotal = int.Parse(property.value);
                    }
                    if (property.name.Equals("CodeCoverageM"))
                    {
                        codeCoverage.MethodPercent = double.Parse(property.value, CultureInfo.InvariantCulture);
                    }
                    codeCoverage.MethodNonCovered = codeCoverage.MethodTotal - codeCoverage.MethodCovered;
                    //Statement
                    if (property.name.Equals("CodeCoverageAbsSCovered"))
                    {
                        codeCoverage.StatementCovered = int.Parse(property.value);
                    }
                    if (property.name.Equals("CodeCoverageAbsSTotal"))
                    {
                        codeCoverage.StatementTotal = int.Parse(property.value);
                    }
                    if (property.name.Equals("CodeCoverageS"))
                    {
                        codeCoverage.StatementPercent = double.Parse(property.value, CultureInfo.InvariantCulture);
                    }
                    codeCoverage.StatementNonCovered = codeCoverage.StatementTotal - codeCoverage.StatementCovered;
                }
            }
            return codeCoverage;
        }

        public CodeInspections GetCodeInspections(int id)
        {
            CodeInspections codeInspections = new CodeInspections();
            var Statresponse = httpClient.GetAsync(BASE_URI + "/builds/id:" + id + "/statistics").Result;
            if (Statresponse.IsSuccessStatusCode)
            {
                var BuildStatResponse = Statresponse.Content.ReadAsStringAsync().Result;
                BuildStats stats = JsonConvert.DeserializeObject<BuildStats>(BuildStatResponse);
                foreach (var property in stats.property)
                {
                    if (property.name.Equals("InspectionStatsE"))
                    {
                        codeInspections.Errors = int.Parse(property.value);
                    }
                    if (property.name.Equals("InspectionStatsW"))
                    {
                        codeInspections.Warnings = int.Parse(property.value);
                    }
                }
            }
            return codeInspections;
        }
    }
}
