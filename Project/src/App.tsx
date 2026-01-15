import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react';
import { Header } from './components/MainPage/Header/Header';
import { Footer } from './components/Footer/Footer';

// Ленивая загрузка компонентов
const LazyMainPage = lazy(() => import('./pages/MainPage/MainPage'));
const LazyGenresPage = lazy(() => import('./pages/GenresPage/GenresPage'));
const LazyFetchGenreFilmsPage = lazy(() => import('./components/GenreFilmsPage/api/FetchGenreFilmsPage'))
const LazyFetchFilmPage = lazy(() => import('./components/FilmPage/api/fetchFilmById'));
const LazyMyAccountPage = lazy(() => import('./pages/MyAccountPage/MyAccountPage'));
const LazySelectedFilms = lazy(() => import('./components/MyAccount/SelectedFilms/SelectedFilms'));
const LazyAccountSettings = lazy(() => import('./components/MyAccount/AccountSettings/AccountSettings'));

const LoadingFallback = () => (
	<div className="loading-container">
		<div className="loading-spinner"></div>
		<p>Загрузка...</p>
	</div>
);

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Suspense fallback={<LoadingFallback />}>
				<main>
					<Routes>
						<Route index element={<LazyMainPage />} />
						<Route path="/genres/" element={<LazyGenresPage />} />
						<Route path="/genre/:genreSlug" element={<LazyFetchGenreFilmsPage />} />
						<Route path="/movie/:movieId" element={<LazyFetchFilmPage />} />
						{/* Вложенные роуты для аккаунта */}
						<Route path="/account" element={<LazyMyAccountPage />}>
							<Route index element={<LazySelectedFilms />} />
							<Route path="favorites" element={<LazySelectedFilms />} />
							<Route path="settings" element={<LazyAccountSettings />} />
						</Route>
					</Routes>
				</main>
				<Footer />
			</Suspense>
		</BrowserRouter>
	)
}

export default App
