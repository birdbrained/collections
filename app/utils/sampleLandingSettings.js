let collectionSettings = {
  branding: {
    colors: {
      primary: '#215264',
      secondary: '#eeeeee',
      background: '#e14b5a',
      backgroundText: '#ffffff'
    },
    logo: {
      label: 'socarxiv',
      url: 'https://osf.io/preprints/assets/img/provider_logos/socarxiv-small-ee6338993da17d8c871e23ae39d0b29e3c171abf.png',
      height: '140px'
    }
  },
  layout: [
      {
          type: 'landing-hero',
          title: 'You can override collection title here',
          tagline: 'Open archive of the social sciences',
          data: null,
          settings: {
              useLogo: true
          }
      },
      {
          type: 'landing-list',
          title: 'Subjects',
          data: 'subjects',
          settings: null
      },
      {
          type: 'landing-board',
          title: 'Steering Committee',
          data: 'people',
          settings: null
      },
      {
          type: 'landing-copyright',
          title: null,
          data: 'links',
          settings: null
      }
  ],
  data: {
      subjects: [{
          name: 'Arts and Humanities',
          label: 'Fine Arts, History, Music, Philosophy, Religion',
          link: '/preprints/socarxiv/discover?subject=Arts%20and%20Humanities'
        },
        {
          name: 'Arts and Humanities',
          label: 'Fine Arts, History, Music, Philosophy, Religion',
          link: '/preprints/socarxiv/discover?subject=Arts%20and%20Humanities'
        },
        {
          name: 'Arts and Humanities',
          label: 'Fine Arts, History, Music, Philosophy, Religion',
          link: '/preprints/socarxiv/discover?subject=Arts%20and%20Humanities'
        },
        {
          name: 'Arts and Humanities',
          label: 'Fine Arts, History, Music, Philosophy, Religion',
          link: '/preprints/socarxiv/discover?subject=Arts%20and%20Humanities'
        },
    ],
    people: [
        {
          firstName: 'Donna',
          lastName: 'Brown',
          institution: 'Massachusetts Institute of Technology'
        }, {
          firstName: 'Maria',
          lastName: 'Gonzales',
          institution: 'University of North Carolina at Chapel Hill'
        }, {
          firstName: 'George',
          lastName: 'Wu',
          institution: 'Massachusetts Institute of Technology'
        }, {
          firstName: 'Donna',
          lastName: 'Brown',
          institution: 'University of Maryland, College Park'
        }, {
          firstName: 'Maria',
          lastName: 'Gonzales',
          institution: 'University of North Carolina at Chapel Hill'
        }, {
          firstName: 'George',
          lastName: 'Wu',
          institution: 'University of Maryland, College Park'
        }, {
          firstName: 'Maria',
          lastName: 'Gonzales',
          institution: 'University of North Carolina at Chapel Hill'
        }, {
          firstName: 'Maria',
          lastName: 'Gonzales',
          institution: 'University of North Carolina at Chapel Hill'
        }, {
          firstName: 'George',
          lastName: 'Wu',
          institution: 'University of Maryland, College Park'
        }, {
          firstName: 'Maria',
          lastName: 'Gonzales',
          institution: 'University of North Carolina at Chapel Hill'
        }, {
          firstName: 'Maria',
          lastName: 'Gonzales',
          institution: 'University of North Carolina at Chapel Hill'
        }, {
          firstName: 'George',
          lastName: 'Wu',
          institution: 'University of Maryland, College Park'
        }, {
          firstName: 'Maria',
          lastName: 'Gonzales',
          institution: 'University of North Carolina at Chapel Hill'
        },
    ],
    links: [
        {
            label: 'Support',
            url: '/support'
          },
          {
            label: 'Contact',
            url: '/contact'
          },
          {
            label: 'Twitter',
            url: '/twitter/somearchive',
            icon: 'fa-twitter'
          }
        ]
  }
};

export {
  collectionSettings
};
