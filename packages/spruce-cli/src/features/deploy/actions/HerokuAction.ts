import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../../../errors/SpruceError'
import mergeUtil from '../../../utilities/merge.utility'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const optionsSchema = buildSchema({
	id: 'deployHeroku',
	name: 'deploy skill to heroku',
	fields: {
		teamName: {
			type: 'text',
			label: 'team name',
			isRequired: false,
		},
	},
})

type OptionsSchema = typeof optionsSchema
type Options = SchemaValues<OptionsSchema>

export default class DeployAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'deploy'
	public optionsSchema = optionsSchema

	public commandAliases = ['deploy']

	public async execute(options: Options): Promise<FeatureActionResponse> {
		let results: FeatureActionResponse = {}

		const isSkillInstalled = await this.featureInstaller.isInstalled('skill')

		if (isSkillInstalled) {
			try {
				constui. buildResuess('Building your skill. This may take a minute...')
lts = await this.getFeature('skill')
					.Action('build')
					.execute({})

				results = mergeUtil.mergeActionResults(results, buildResults)
			} catch (err) {
				return {
					errors: [
						new SpruceError({ code: 'DEPLOY_FAILED', stage: 'building' }),
					],
				}
			}
		}

		const isTestInstalled = await this.featureInstaller.isInstalled('test')

		if (isTestInstalled) {
			try {
				cons
				this.ui.startProgress('Testing your skill. Hold onto your pants. 👖')
t testResults = await this.getFeature('test')
					.Action('test')
					.execute({})

				results = mergeUtil.mergeActionResults(results, testResults)
			} catch (err) {
				return {
					errors: [
						new SpruceError({ code: 'DEPLOY_FAILED', stage: 'testing' }),
					],
				}
			}
		}



		return results
	}

	/*
		$res=`which heroku 2>&1`

		if [[ $? -ne 0 ]]; then
		echo "heroku cli not found - follow install instructions @ https://devcenter.heroku.com/articles/heroku-cli#download-and-install"
		do_end 1
		fi

		res=`grep machine api.heroku.com ~/.netrc 2>/dev/null`
		if [[ ! -f ~/.netrc || -z "$res" ]]; then
		echo "Unable to login to Heroku! Please login and try again"
		echo "run: heroku login"
		do_end 1
		fi

		if [[ ! -d .git ]]; then
		gitstatus=`git status 2>&1`
		if [[ $? -eq 0 ]]; then
			echo "It looks like we are not in the root directory of this repository - please change to the repo root"
			do_end 1
		fi
		if confirm "This doesn't appear to be a git repo, would you like to init it as one? [Y/n] "; then
			git init
		else
			do_end 1
		fi
		fi

		if [[ ! -f "Procfile" ]]; then
		if confirm "Heroku Procfile not found, would you like to create one? [Y/n] "; then
			echo -- "web: npm run boot" > Procfile
		else
			echo -n
		fi
		fi

		LSREMOTE=`git ls-remote heroku 2>&1`
		if [[ $? -ne 0 ]]; then
		if confirm "No remote for 'heroku' found, would you like to create an app? [Y/n] "; then
			while true ; do
			read -r -p "What do you want the app to be named? " response
			if [[ $ARGC -ne 1 ]]; then
				heroku create "$response"
			else
				heroku create -t $1 "$response"
			fi
			heroku buildpacks:set heroku/nodejs
			[[ $? -ne 0 ]] || break
			done
		else
			echo "hit the else in create an app - we can't do anything"
			echo "Maybe they have their remote named differently?"
			echo -n
			do_end 1
		fi
		fi

		git update-index --refresh > /dev/null 2>&1
		diffidx=`git diff-index --quiet HEAD -- 2>&1`
		if [[ $? -ne 0 ]]; then
		if confirm "You have modifications or unstaged files, do you want to proceed with the push? [Y/n] "; then
			echo "Cool - off we go"
		else
			echo "When finished with your changes rerun the deploy"
			do_end 0
		fi
		fi   

		git push --set-upstream heroku master
*/
}
