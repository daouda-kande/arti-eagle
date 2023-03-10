export default [
  { heading: "Dashboard" },
  {
    title: "Executif",
    to: 'dashboards-analytics',
    icon: { icon: 'tabler-affiliate-filled' },
  },
  {
    title: 'Dashboards',
    icon: { icon: 'tabler-smart-home' },
    children: [
      // {
      //   title: 'Analytics',
      //   to: 'dashboards-analytics',
      // },
      {
        title: 'eCommerce',
        to: 'dashboards-ecommerce',
      },
      {
        title: 'CRM',
        to: 'dashboards-crm',
      },
    ],
    badgeContent: '2',
    badgeClass: 'bg-light-primary text-primary',
  },
]
