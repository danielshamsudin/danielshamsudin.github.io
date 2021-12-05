// config.js
module.exports = {
    github: {
        username: 'danielshamsudin', // Your GitHub org/user name. (Required)
        sortBy: 'updated', // stars | updated
        limit: 10, // How many projects to display.
        exclude: {
            forks: false, // Forked projects will not be displayed if set to true.
            projects: [] // These projects will not be displayed. example: ['my-project1', 'my-project2']
        }
    },
    social: {
        linkedin: 'daniel-shamsudin-127175199',
        twitter: '@d4ls7n',
        facebook: 'ananda.dwi.75641297',
        dribbble: '',
        behance: '',
        medium: '',
        devto: '',
        website: '',
        phone: '',
        email: '1181102032@student.mmu.edu.my'
    },
    skills: [
        'C++',
        'C',
        'Python',
        'PHP',
        'JavaScript',
        'Postgresql',
        'MySQL',
        'Gitlab',
        'HTML',
        'Bootstrap',
		'',
    ],
    experiences: [
        { 
            company: 'IS Lab @ MMU',
            position: 'Software Developer Intern',
            from: 'March 2021',
            to: 'July 2021'
        },
        
    ],
    education: [
       { 
           institution: 'Multimedia University Melaka',
           degree: 'Bachelor of Information Technology (Hons. AI)',
           from: '2018',
           to: '2022'
       },
        
    ],
    blog: {
        // Display blog posts from your medium or dev.to account. (Optional)
        source: '', // medium | dev.to
        username: '',
        limit: 2 // How many posts to display. Max is 10.
    },
    googleAnalytics: {
        // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
        id: '' // Please remove this and use your own tag id or keep it empty
    },
    hotjar: {
        id: '', //  Please remove this and use your own id or keep it empty
        snippetVersion : 6
    },
    themeConfig: {
        default: 'light',

        // Hides the switch in the navbar
        // Useful if you want to support a single color mode
        disableSwitch: false,

        // Should we use the prefers-color-scheme media-query,
        // using user system preferences, instead of the hardcoded default
        respectPrefersColorScheme: true,

        // Available themes. To remove any theme, exclude from here.
        themes: [
            'light',
            'dark',
            'cupcake',
            'bumblebee',
            'emerald',
            'corporate',
            'synthwave',
            'retro',
            'cyberpunk',
            'valentine',
            'halloween',
            'garden',
            'forest',
            'aqua',
            'lofi',
            'pastel',
            'fantasy',
            'wireframe',
            'black',
            'luxury',
            'dracula'
        ]
    }
}
