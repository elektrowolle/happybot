require('load-grunt-tasks')(grunt);

module.exports = function (grunt) {
  babel: {
		options: {
			sourceMap: true,
			presets: ['babel-preset-es2015']
		},
		dist: {
			files: {
				'**/*.es6': '**/*.js'
			}
		}
	}
}

grunt.registerTask('default', ['babel']);
