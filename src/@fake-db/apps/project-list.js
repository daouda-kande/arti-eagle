import mock from '@/@fake-db/mock'

const projects = [
  {
    id: 1,
    code: "76485-1048",
    name: "Panthera tigris",
    direction: "DSESP",
    start_date: "2023-05-13",
    end_date: "2023-10-11",
    status: "Schedulled",
    progress: 0,
    budget: 270,
  },
  {
    id: 2,
    code: "10631-121",
    name: "Dicrostonyx groenlandicus",
    direction: "DSESP",
    start_date: "2023-02-12",
    end_date: "2024-06-22",
    status: "In Progress",
    progress: 12,
    budget: 635,
  },
  {
    id: 3,
    code: "0115-9911",
    name: "Bettongia penicillata",
    direction: "DRRN",
    start_date: "2023-04-13",
    end_date: "2024-02-23",
    status: "Stopped",
    progress: 49,
    budget: 872,
  },
  {
    id: 4,
    code: "21130-724",
    name: "Cynomys ludovicianus",
    direction: "DCSTI",
    start_date: "2023-05-27",
    end_date: "2024-08-13",
    status: "Failled",
    progress: 70,
    budget: 1072,
  },
  {
    id: 5,
    code: "0781-1223",
    name: "Macropus eugenii",
    direction: "DCSTI",
    start_date: "2023-03-12",
    end_date: "2023-07-04",
    status: "Stopped",
    progress: 65,
    budget: 513,
  },
  {
    id: 6,
    code: "68788-9111",
    name: "Sylvilagus floridanus",
    direction: "DAAF",
    start_date: "2023-02-28",
    end_date: "2024-01-29",
    status: "Finished",
    progress: 100,
    budget: 571,
  },
  {
    id: 7,
    code: "54569-3912",
    name: "Taxidea taxus",
    direction: "DSESP",
    start_date: "2023-04-27",
    end_date: "2023-11-19",
    status: "Schedulled",
    progress: 0,
    budget: 946,
  },
  {
    id: 8,
    code: "50532-112",
    name: "Theropithecus gelada",
    direction: "DCP",
    start_date: "2023-05-14",
    end_date: "2024-01-14",
    status: "In Progress",
    progress: 17,
    budget: 1103,
  },
  {
    id: 9,
    code: "57520-0053",
    name: "Acridotheres tristis",
    direction: "DCP",
    start_date: "2023-04-19",
    end_date: "2023-09-01",
    status: "Finished",
    progress: 100,
    budget: 260,
  },
  {
    id: 10,
    code: "63736-310",
    name: "Plegadis ridgwayi",
    direction: "GMGP",
    start_date: "2023-03-31",
    end_date: "2023-10-05",
    status: "Stopped",
    progress: 37,
    budget: 738,
  },
  {
    id: 11,
    code: "0409-2540",
    name: "Phalacrocorax albiventer",
    direction: "DGPECRP",
    start_date: "2023-05-26",
    end_date: "2024-05-20",
    status: "Failled",
    progress: 29,
    budget: 426,
  },
  {
    id: 12,
    code: "68084-459",
    name: "Butorides striatus",
    direction: "DSI",
    start_date: "2023-02-02",
    end_date: "2024-02-03",
    status: "Stopped",
    progress: 68,
    budget: 1134,
  },
]


// 👉  return projects
mock.onGet('/apps/projects/list').reply(config => {
  const { q = '', direction = null, status = null, perPage = 10, currentPage = 1 } = config.params ?? {}
  const queryLower = q.toLowerCase()

  let filteredProjects = projects.filter(project => ((project.code.toLowerCase().includes(queryLower) || project.name.toLowerCase().includes(queryLower)) && project.status === (status || project.status) && project.direction === (direction || project.direction))).reverse()
  const totalPage = Math.ceil(filteredProjects.length / perPage) ? Math.ceil(filteredProjects.length / perPage) : 1
  const totalProjects = filteredProjects.length
  if (perPage) {
    const firstIndex = (currentPage - 1) * perPage
    const lastIndex = perPage * currentPage

    filteredProjects = filteredProjects.slice(firstIndex, lastIndex)
  }
  
  return [200, { projects: filteredProjects, totalPage, totalProjects }]
})

// 👉 Add project
mock.onPost('/apps/projects/project').reply(config => {
  const { project } = JSON.parse(config.data)
  const { length } = projects
  let lastIndex = 0
  if (length)
    lastIndex = projects[length - 1].id
  project.id = lastIndex + 1
  projects.push(project)
  
  return [201, { project }]
})
mock.onGet(/\/apps\/projects\/\d+/).reply(config => {
  // Get event id from URL
  const projectId = config.url?.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  const Id = Number(projectId)
  const projectIndex = projects.findIndex(e => e.id === Id)
  const project = projects[projectIndex]

  Object.assign(project, {
    taskDone: 1230,
    projectDone: 568,
    taxId: 'Tax-8894',
    language: 'English',
  })
  if (project)
    return [200, project]
  
  return [404]
})
