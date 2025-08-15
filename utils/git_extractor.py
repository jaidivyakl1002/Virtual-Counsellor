from github import Github, Auth
from datetime import datetime
import os
import json
import base64
from typing import Annotated, Sequence, TypedDict, List, Dict, Any, Optional

class GithubExtractor:
    def __init__(self, token: str = None):
        if token:
            auth = Auth.Token(token)
            self.g = Github(auth=auth)
        else:
            self.g = Github()
        
        self.data = {
            'extraction_timestamp': datetime.now().isoformat(),
            'user_info': {},
            'repositories': [],
            'errors': []
        }
    
    def extract_complete_profile(self, username: str) -> Dict[str, Any]:
        """Extract complete GitHub profile data"""
        try:
            user = self.g.get_user(username)
            
            # Extract user info
            user_info = {
                'login': user.login,
                'name': user.name,
                'bio': user.bio,
                'company': user.company,
                'location': user.location,
                'email': user.email,
                'blog': user.blog,
                'public_repos': user.public_repos,
                'public_gists': user.public_gists,
                'followers': user.followers,
                'following': user.following,
                'created_at': user.created_at.isoformat() if user.created_at else None,
                'updated_at': user.updated_at.isoformat() if user.updated_at else None
            }
            
            # Extract repositories
            repositories = []
            for repo in user.get_repos()[:20]:  # Top 20 repos
                repo_info = {
                    'name': repo.name,
                    'full_name': repo.full_name,
                    'description': repo.description,
                    'language': repo.language,
                    'stargazers_count': repo.stargazers_count,
                    'forks_count': repo.forks_count,
                    'size': repo.size,
                    'created_at': repo.created_at.isoformat() if repo.created_at else None,
                    'updated_at': repo.updated_at.isoformat() if repo.updated_at else None,
                    'topics': repo.topics,
                    'languages': dict(repo.get_languages()) if hasattr(repo, 'get_languages') else {}
                }
                
                # Get README if available
                try:
                    readme = repo.get_readme()
                    readme_content = base64.b64decode(readme.content).decode('utf-8')
                    repo_info['readme'] = readme_content[:1000]  # First 1000 chars
                except:
                    repo_info['readme'] = None
                
                repositories.append(repo_info)
            
            self.data['user_info'] = user_info
            self.data['repositories'] = repositories
            
            return self.data
            
        except Exception as e:
            self.data['errors'].append(f"Error extracting GitHub data: {str(e)}")
            return self.data