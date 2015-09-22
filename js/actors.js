var api = {};
var ids;

api.url = "https://api.themoviedb.org/3/";
api.key = "api_key=272d690f749890fab4af26826ac2e91f";
api.config = {};
GetConfig();

function GetConfig() {
	$.getJSON(api.url + "configuration?" + api.key)
		.done(function (json) {
			api.config.image_url =  json.images.base_url;
			api.config.image_size =  json.images.poster_sizes[0];			
		});
}

function GetActor(query) {
	$.getJSON(api.url + "search/person?query=" + query + "&" + api.key, function (json) {
		console.log(json);

		$.each(json.results, function (index, item) {
			$('#results').append("<li class='result' data-id='" + item.id + "'>" + item.name + "</li>");
			if (index === 4)
				return false;
		});
	});
}

function GetMovies(actors) {
	var movies = [];
	var people = [];

	$.each(actors, function (index, item) {
		people.push(item.dataset.id);
	});

	$.getJSON(api.url + "discover/movie?with_cast=" + people.join(",") + "&sort_by=popularity.desc&" + api.key)
		.done(function (json) {
			console.log(json);

			$.each(json.results, function (index, movie) {
				movies.push({ 
					id: movie.id, 
					title: movie.title, 
					date: movie.release_date, 
					summary: movie.overview, 
					poster: movie.poster_path });
			});

			DisplayMovies(movies)
			console.log(movies);
		});

	return movies;
}

function DisplayMovies(movies) {
	movies.forEach(function (element) {
		var imagePath = api.config.image_url + "/" + api.config.image_size + "/" + element.poster;
		var sum;
		
		if (element.summary.length > 200) {
			sum = element.summary.substring(0, 200) + " ...";
		} else {
			sum = element.summary;
		}
		
		$('#matches').append("<div class='match' data-id='" + element.id + 
			"'><img src='" + imagePath + "' class='poster' /><h4>" + element.title + " (" + new Date(element.date).getFullYear() + 
			")</h4><p>" + sum + "</p></div>");
	}, this);
}

$(document).ready(function () {
	$('#results').empty();
	$('#matches').empty();

	$('#search').click(function () {
		$('#results').empty();
		var query = $('#term').val();
		GetActor(query);
	});
	
	$('#term').keyup(function () {
		$('#results').empty();
		var query = $('#term').val();
		if (query.length > 2)
			GetActor(query);
	});

	$('#results').on('click', '.result', function () {
		var id = $(this).data('id');
		console.log(id);
		var actors = $('#actors')[0];
		if (actors.innerHTML == '...') {
			actors.innerHTML = "<span data-id='" + id + "'>" + $(this)[0].innerHTML + "</span>";
		} else {
			actors.innerHTML = actors.innerHTML.replace(" and ", ", ");
			actors.innerHTML += " and ";
			actors.innerHTML += "<span data-id='" + id + "'>" + $(this)[0].innerHTML + "</span>";
		}
		$('#results').empty();
		$('#term').val("");
	});

	$('#clear').click(function () {
		$('#results').empty();
		$('#term').val("");
		$("#actors")[0].innerHTML = "...";
		$('#matches').empty();
	});

	$('#go').click(function () {
		var actors = $("#actors > span");

		GetMovies(actors);
	});
});
