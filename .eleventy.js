module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('src/images')

	eleventyConfig.addWatchTarget('dist/*.css')
	eleventyConfig.setBrowserSyncConfig({
		files: ['dist/*.css'],
	})

	return {
		dir: {
			input: 'src',
			output: 'dist',
			includes: 'sections',
			data: 'data',
			layouts: 'layouts',
			passthroughFileCopy: true,
			templateFormats: ['html', 'njk', 'md'],
			htmlTemplateEngine: 'njk',
			markdownTemplateEngine: 'njk',
		},
	}
}