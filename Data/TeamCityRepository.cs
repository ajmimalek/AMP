﻿using AMP.API_Models;
using AMP.Dtos;
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

        public Models.Build GetBuildById(int id)
        {
            Models.Build build;
            var response = httpClient.GetAsync(BASE_URI + "/builds/" + id.ToString() + "?fields=id,number,status,state,branchName,webUrl,statusText,startDate,finishDate,buildType(name),lastChanges(change(id))").Result;
            if (response.IsSuccessStatusCode)
            {
                var BuildResponse = response.Content.ReadAsStringAsync().Result;
                BuildDetails BuildInfos = JsonConvert.DeserializeObject<BuildDetails>(BuildResponse);
                build = new Models.Build(BuildInfos.id, BuildInfos.number, BuildInfos.status, BuildInfos.state, BuildInfos.branchName, BuildInfos.webUrl, BuildInfos.statusText, BuildInfos.buildType.name, BuildInfos.lastChanges.change[0].id);
                TimeSpan exec = DateTime.ParseExact(BuildInfos.finishDate, "yyyyMMdd'T'HHmmsszzz", CultureInfo.InvariantCulture) - DateTime.ParseExact(BuildInfos.startDate, "yyyyMMdd'T'HHmmsszzz", CultureInfo.InvariantCulture);
                build.ExecutionTime = exec.ToString();
                return build;
            }
            return null;
        }

        public Changes GetBuildChanges(int id)
        {
            Models.Build build = GetBuildById(id);
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
                    file = new Models.Files(i, changesDetails.files.file[i].file, changesDetails.files.file[i].changeType);
                    if (changesDetails.files.file[i].changeType.Equals("added"))
                    {
                        changes.AddedFiles++;
                    }
                    if (changesDetails.files.file[i].changeType.Equals("edited"))
                    {
                        changes.EditedFiles++;
                    }
                    if (changesDetails.files.file[i].changeType.Equals("deleted"))
                    {
                        changes.DeletedFiles++;
                    }
                    changes.files.Add(file);
                }
                return changes;
            }
            return null;
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

        public List<Builds> GetSuccessfulBuilds()
        {
            Builds SuccessfulBuild;
            List<Builds> SuccessfulBuilds = new List<Builds>();
            var response = httpClient.GetAsync(BASE_URI + "/builds/?locator=status:SUCCESS&fields=nextHref,build(id,status)").Result;
            if (response.IsSuccessStatusCode)
            {
                var Response = response.Content.ReadAsStringAsync().Result;
                BuildList buildList = JsonConvert.DeserializeObject<BuildList>(Response);
                    foreach (var build in buildList.build)
                    {
                        SuccessfulBuild = new Builds(build.id, build.status, GetBuildChanges(build.id).UserName);
                        SuccessfulBuilds.Add(SuccessfulBuild);
                    }

            }
            return SuccessfulBuilds;
        }

        public List<Builds> GetFailedBuilds()
        {
            Builds FailedBuild;
            List<Builds> FailedBuilds = new List<Builds>();
            var response = httpClient.GetAsync(BASE_URI + "/builds/?locator=status:FAILURE&fields=nextHref,build(id,status)").Result;
            if (response.IsSuccessStatusCode)
            {
                var Response = response.Content.ReadAsStringAsync().Result;
                BuildList buildList = JsonConvert.DeserializeObject<BuildList>(Response);
                foreach (var build in buildList.build)
                {
                    FailedBuild = new Builds(build.id, build.status, GetBuildChanges(build.id).UserName);
                    FailedBuilds.Add(FailedBuild);
                }

            }
            return FailedBuilds;
        }

        public List<Builds> GetBuilds()
        {
            Builds Build;
            List<Builds> BuildsList = new List<Builds>();
            var response = httpClient.GetAsync(BASE_URI + "/builds/?fields=nextHref,build(id,status)").Result;
            if (response.IsSuccessStatusCode)
            {
                var Response = response.Content.ReadAsStringAsync().Result;
                BuildList buildList = JsonConvert.DeserializeObject<BuildList>(Response);
                foreach (var build in buildList.build)
                {
                    Build = new Builds(build.id, build.status, GetBuildChanges(build.id).UserName);

                    BuildsList.Add(Build);
                }

            }
            return BuildsList;
        }

        public BuildDashboard GetDashboard()
        {
            List<Builds> builds = GetBuilds();
            BuildDashboard dashboard = new BuildDashboard();
            dashboard.BuildSuccess = 0;
            dashboard.BuildFailure = 0;
            foreach (var build in builds)
            {
                if (build.status.Equals("SUCCESS"))
                {
                    dashboard.BuildSuccess++;
                }
                if (build.status.Equals("FAILURE"))
                {
                    dashboard.BuildFailure++;
                }
            }
            return dashboard;
        }
    }
}
