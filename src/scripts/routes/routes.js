import RegisterPage from '../pages/auth/register/register-page';
import LoginPage from '../pages/auth/login/login-page';
import HomePage from '../pages/home/home-page';
import ArticlesPage from '../pages/articles/articles-page';
import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from '../utils/auth';
import RecommendationsPage from '../pages/recommendations/recommendations-page';
import HeartCheckPage from '../pages/heart/heart-check-page';
import DiabetesCheckPage from '../pages/diabetes/check-diabetes-page'; 
import HistoryPage from '../pages/history/history-page';
import MonitoringPage from '../pages/monitoring/monitoring-page'; 

export const routes = {
  '/login': () => checkUnauthenticatedRouteOnly(new LoginPage()),
  '/register': () => checkUnauthenticatedRouteOnly(new RegisterPage()),

  '/': () => checkAuthenticatedRoute(new HomePage()),
  '/articles': () => checkAuthenticatedRoute(new ArticlesPage()),
  '/recommendations': () => checkAuthenticatedRoute(new RecommendationsPage()),
  '/heart-check': () => checkAuthenticatedRoute(new HeartCheckPage()),
  '/diabetes-check': () => checkAuthenticatedRoute(new DiabetesCheckPage()),
  '/history': () => checkAuthenticatedRoute(new HistoryPage()),
  '/monitoring': () => checkAuthenticatedRoute(new MonitoringPage()),
};
