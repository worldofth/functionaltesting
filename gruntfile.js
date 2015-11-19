var gruntConfig = {};

// gruntConfig.eslint = {
// 	options: {
//     //     plugins: ["react"],
//     //     ecmaFeatures: {
//     // 		"jsx": true
//   		// }
//     },
//     target: ['js/src/**/*.js', 'js/src/**/*.jsx']
// };

gruntConfig.less = {
	dist: {
		files: {
			'resources/css/main.css': 'resources/css/main.less'
		},
		options: {
			//compress: true,
			sourceMap: true
		}
	}
};

gruntConfig.connect = {
	server: {
		options: {
			port: 8080,
	        livereload: true
		}
	}
};

gruntConfig.watch = {
	options: {
		interrupt: true,
		livereload: true
	},
	html: {
		files: ['*.html']
	},
	scripts: {
		files: ['resources/js/**/*.js'],
		//tasks: ['eslint'],
	},
	css: {
		files: ['resources/css/**/*.less'],
		tasks: ['less'],
	}
};

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig(gruntConfig);

	grunt.registerTask('default', ['connect', 'watch']);
};

