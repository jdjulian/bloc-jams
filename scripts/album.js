var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { name: 'Blue', length: '4:26' },
        { name: 'Green', length: '3:14' },
        { name: 'Red', length: '5:01' },
        { name: 'Pink', length: '3:21' },
        { name: 'Magenta', length: '2:15' }
    ]
};

var albumMarconi = {
    name: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { name: 'Hello, Operator?', length: '1:01' },
        { name: 'Ring, ring, ring', length: '5:01' },
        { name: 'Fits in your pocket', length: '3:21' },
        { name: 'Can you hear me now?', length: '3:14' },
        { name: 'Wrong phone number', length: '2:15' }
    ]
};

//Assignment 25 - Create a third album object

var myAlbum = {
    name: 'Learning To Code',
    artist: 'Jean Juliano',
    label: 'JJ',
    year: '2015',
    albumArtUrl: 'assets/images/album_covers/03.png',
    songs: [
        { name: 'HTML is like the Skeleton', length: '1:01' },
        { name: 'CSS gives me color', length: '5:01' },
        { name: 'Javascript makes me move', length: '3:21' },
        { name: 'DOM Wha?', length: '3:14' },
        { name: 'Too many JC libraries', length: '2:15' }
    ]
};


var createSongRow = function(songNumber, songName, songLength) {
    var template =
           '<tr class="album-view-song-item">'
    +   '   <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'    
    +   '   <td class="song-item-title">' + songName + '</td>'
    +   '   <td class="song-item-duration">' + songLength + '</td>'
    +   '</tr>'
    ;
    
    return template;
};

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {
    
    albumTitle.firstChild.nodeValue = album.name;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);
    
    albumSongList.innerHTML = '';
    
    for (i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
    }
};

//Checkpoint 27- code below looks up the DOM tree to select parent element
var findParentByClassName = function(element, targetClass) {
    var currentParent = element.parentElement;
    while (currentParent.className != targetClass) {
        currentParent = currentParent.parentElement;
    }
    return currentParent;
};

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number);
        case 'song-item-title':                                 case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
};
                                        

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

//ALbum button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

//Checkpoint 27
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//Store state of playing songs
var currentlyPlayingSong = null; //set to null so no song is identified as playing until one is clicked

window.onload = function() {
    setCurrentAlbum(albumPicasso);

    var albums = [albumPicasso, albumMarconi, myAlbum];
    var index = 1;
    albumImage.addEventListener("click", function(event) {
        setCurrentAlbum(albums[index]);
        index++;
        if (index == albums.length) {
            index = 0;
        }
    });
};

