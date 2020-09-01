import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepo } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const ProfileGitHub = ({ username, getGithubRepo, profile: { repos } }) => {
    useEffect(() => {
        getGithubRepo(username)
    }, [getGithubRepo, username])

    console.log(username);

    if (repos === null) return <Spinner />

    return (
        <Fragment>
            <div class="profile-github">
                <h2 class="text-primary my-1">
                    <i class="fab fa-github"></i> Github Repos
                </h2>
                <div class="repo bg-white p-1 my-1">
                    { repos.map((repo, index) => <Fragment>
                            <div key={index}>
                                <h4><a href={ repo.html_url} target="_blank" rel="noopener noreferrer">{ repo.name }</a></h4>
                                <p>{ repo.description }</p>
                            </div>
                            <div>
                            <ul>
                                <li class="badge badge-primary">Stars: { repo.stargazers_count}</li>
                                <li class="badge badge-dark">Watchers: { repo.watchers_count}</li>
                                <li class="badge badge-light">Forks: { repo.forks_count}</li>
                            </ul>
                        </div>    
                    </Fragment> )}
                </div>
            </div>
        </Fragment>
    )
}

ProfileGitHub.propTypes = {
    repos: PropTypes.array.isRequired,
    getGithubRepo: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    repos: state.profile.repos
})

export default connect(mapStateToProps, { getGithubRepo })(ProfileGitHub)
