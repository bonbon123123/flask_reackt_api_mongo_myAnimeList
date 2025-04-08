db = db.getSiblingDB('animeDB');

db.anime.insertMany([
    {
        _id: "7442",
        title: "Attack on Titan",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/7442/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/7442/original.jpg"
        },
        episodeCount: 25,
        watchedEpisodes: [1, 2],
        completed: false,
        startedWatching: new Date("2024-12-13"),
        finishedWatching: null,
        rating: 6,
        apiLink: "https://kitsu.io/api/edge/anime/7442",
        synopsis: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations.\\n\\nAfter witnessing a horrific personal loss at the hands of the invading creatures, Eren Yeager dedicates his life to their eradication by enlisting into the Survey Corps, an elite military unit that combats the merciless humanoids outside the protection of the walls. Based on Hajime Isayama's award-winning manga, Shingeki no Kyojin follows Eren, along with his adopted sister Mikasa Ackerman and his childhood friend Armin Arlert, as they join the brutal war against the titans and race to discover a way of defeating them before the last walls are breached.\\n\\n(Source: MAL Rewrite)",
        popularityRank: 1,
        ratingRank: 30
    },
    {
        _id: "11469",
        title: "My Hero Academia",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/11469/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/11469/original.png"
        },
        episodeCount: 13,
        watchedEpisodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        completed: false,
        startedWatching: new Date("2025-03-07"),
        finishedWatching: null,
        rating: 1,
        apiLink: "https://kitsu.io/api/edge/anime/11469",
        synopsis: "What would the world be like if 80 percent of the population manifested extraordinary superpowers called \u201cQuirks\u201d at age four? Heroes and villains would be battling it out everywhere! Becoming a hero would mean learning to use your power, but where would you go to study? U.A. High's Hero Program of course! But what would you do if you were one of the 20 percent who were born Quirkless?\\n\\nMiddle school student Izuku Midoriya wants to be a hero more than anything, but he hasn't got an ounce of power in him. With no chance of ever getting into the prestigious U.A. High School for budding heroes, his life is looking more and more like a dead end. Then an encounter with All Might, the greatest hero of them all gives him a chance to change his destiny\u2026\\n\\n(Source: Viz Media)",
        popularityRank: 2,
        ratingRank: 49
    },
    {
        _id: "12268",
        title: "My Hero Academia Season 2",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/12268/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/12268/original.jpg"
        },
        episodeCount: 25,
        watchedEpisodes: [1, 2, 3, 4],
        completed: false,
        startedWatching: new Date("2024-09-07"),
        finishedWatching: null,
        rating: 4,
        apiLink: "https://kitsu.io/api/edge/anime/12268",
        synopsis: "Taking off right after the last episode of the first season. The school is temporarily closed due to security. When U.A. restarts, it is announced that the highly anticipated School Sports Festival will soon be taking place. All classes: Hero, Support, General and Business will be participating. Tournaments all around will decide who is the top Hero in training.\\n\\n(Source: Anime News Network)",
        popularityRank: 3,
        ratingRank: 43
    },
    {
        _id: "10740",
        title: "One Punch Man",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/10740/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/10740/original.jpg"
        },
        episodeCount: 12,
        watchedEpisodes: [1],
        completed: false,
        startedWatching: new Date("2024-03-17"),
        finishedWatching: null,
        rating: 3,
        apiLink: "https://kitsu.io/api/edge/anime/10740",
        synopsis: "The seemingly ordinary and unimpressive Saitama has a rather unique hobby: being a hero. In order to pursue his childhood dream, he trained relentlessly for three years\u2014and lost all of his hair in the process. Now, Saitama is incredibly powerful, so much so that no enemy is able to defeat him in battle. In fact, all it takes to defeat evildoers with just one punch has led to an unexpected problem\u2014he is no longer able to enjoy the thrill of battling and has become quite bored.\\n\\nThis all changes with the arrival of Genos, a 19-year-old cyborg, who wishes to be Saitama's disciple after seeing what he is capable of. Genos proposes that the two join the Hero Association in order to become certified heroes that will be recognized for their positive contributions to society, and Saitama, shocked that no one knows who he is, quickly agrees. And thus begins the story of One Punch Man, an action-comedy that follows an eccentric individual who longs to fight strong enemies that can hopefully give him the excitement he once felt and just maybe, he'll become popular in the process.\\n\\n(Source: MAL Rewrite)",
        popularityRank: 4,
        ratingRank: 50
    },
    {
        _id: "13881",
        title: "My Hero Academia Season 3",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/13881/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/13881/original.jpg"
        },
        episodeCount: 25,
        watchedEpisodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        completed: false,
        startedWatching: new Date("2024-11-19"),
        finishedWatching: null,
        rating: 1,
        apiLink: "https://kitsu.io/api/edge/anime/13881",
        synopsis: "Summer is here, and the heroes of Class 1-A and 1-B are in for the toughest training camp of their lives! A group of seasoned pros pushes everyone's Quirks to new heights as the students face one overwhelming challenge after another. Braving the elements in this secret location becomes the least of their worries when routine training turns into a critical struggle for survival.\\n\\n(Source: Crunchyroll)",
        popularityRank: 5,
        ratingRank: 40
    },
    {
        _id: "1376",
        title: "Death Note",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/1376/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/1376/original.png"
        },
        episodeCount: 37,
        watchedEpisodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        completed: false,
        startedWatching: new Date("2024-07-26"),
        finishedWatching: null,
        rating: 8,
        apiLink: "https://kitsu.io/api/edge/anime/1376",
        synopsis: "A shinigami, as a god of death, can kill any person\u2014provided they see their victim's face and write their victim's name in a notebook called a Death Note. One day, Ryuk, bored by the shinigami lifestyle and interested in seeing how a human would use a Death Note, drops one into the human realm.\\n\\nHigh school student and prodigy Light Yagami stumbles upon the Death Note and\u2014since he deplores the state of the world\u2014tests the deadly notebook by writing a criminal's name in it. When the criminal dies immediately following his experiment with the Death Note, Light is greatly surprised and quickly recognizes how devastating the power that has fallen into his hands could be.\\n\\nWith this divine capability, Light decides to extinguish all criminals in order to build a new world where crime does not exist and people worship him as a god. Police, however, quickly discover that a serial killer is targeting criminals and, consequently, try to apprehend the culprit. To do this, the Japanese investigators count on the assistance of the best detective in the world: a young and eccentric man known only by the name of L.\\n\\n(Source: MAL Rewrite)",
        popularityRank: 6,
        ratingRank: 55
    },
    {
        _id: "3936",
        title: "Fullmetal Alchemist: Brotherhood",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/3936/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/3936/original.png"
        },
        episodeCount: 64,
        watchedEpisodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
        completed: true,
        startedWatching: new Date("2024-03-07"),
        finishedWatching: new Date("2024-05-07"),
        rating: 3,
        apiLink: "https://kitsu.io/api/edge/anime/3936",
        synopsis: "\\\"In order for something to be obtained, something of equal value must be lost.\\\"\\n\\nAlchemy is bound by this Law of Equivalent Exchange\u2014something the young brothers Edward and Alphonse Elric only realize after attempting human transmutation: the one forbidden act of alchemy. They pay a terrible price for their transgression\u2014Edward loses his left leg, Alphonse his physical body. It is only by the desperate sacrifice of Edward's right arm that he is able to affix Alphonse's soul to a suit of armor. Devastated and alone, it is the hope that they would both eventually return to their original bodies that gives Edward the inspiration to obtain metal limbs called \\\"automail\\\" and become a state alchemist, the Fullmetal Alchemist.\\n\\nThree years of searching later, the brothers seek the Philosopher's Stone, a mythical relic that allows an alchemist to overcome the Law of Equivalent Exchange. Even with military allies Colonel Roy Mustang, Lieutenant Riza Hawkeye, and Lieutenant Colonel Maes Hughes on their side, the brothers find themselves caught up in a nationwide conspiracy that leads them not only to the true nature of the elusive Philosopher's Stone, but their country's murky history as well. In between finding a serial killer and racing against time, Edward and Alphonse must ask themselves if what they are doing will make them human again... or take away their humanity.\\n\\n(Source: MAL Rewrite)",
        popularityRank: 7,
        ratingRank: 70
    },
    {
        _id: "11614",
        title: "Your Name.",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/11614/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/11614/original.jpg"
        },
        episodeCount: 1,
        watchedEpisodes: [],
        completed: false,
        startedWatching: new Date("2024-03-26"),
        finishedWatching: null,
        rating: 4,
        apiLink: "https://kitsu.io/api/edge/anime/11614",
        synopsis: "From director Makoto Shinkai, the innovative mind behind Voices of a Distant Star and 5 Centimeters Per Second, comes a beautiful masterpiece about time, the thread of fate, and the hearts of two young souls.\\n\\nThe day the stars fell, two lives changed forever. High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki\u2019s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other. Yet, somehow, it works. They build a connection and communicate by leaving notes, messages, and more importantly, an imprint.\\n\\nWhen a dazzling comet lights up the night\u2019s sky, it dawns on them. They want something more from this connection\u2014a chance to meet, an opportunity to truly know each other. Tugging at the string of fate, they try to find a way to each other. But distance isn\u2019t the only thing keeping them apart. Is their bond strong enough to face the cruel irony of time? Or is their meeting nothing more than a wish upon the stars?\\n\\n(Source: FUNimation Films)",
        popularityRank: 8,
        ratingRank: 56
    },
    {
        _id: "6448",
        title: "Hunter x Hunter (2011)",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/6448/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/6448/original.png"
        },
        episodeCount: 148,
        watchedEpisodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
        completed: false,
        startedWatching: new Date("2025-02-12"),
        finishedWatching: null,
        rating: 2,
        apiLink: "https://kitsu.io/api/edge/anime/6448",
        synopsis: "Hunter x Hunter is set in a world where Hunters exist to perform all manner of dangerous tasks like capturing criminals and bravely searching for lost treasures in uncharted territories. Twelve-year-old Gon Freecss is determined to become the best Hunter possible in hopes of finding his father, who was a Hunter himself and had long ago abandoned his young son. However, Gon soon realizes the path to achieving his goals is far more challenging than he could have ever imagined.\\n\\nAlong the way to becoming an official Hunter, Gon befriends the lively doctor-in-training Leorio, vengeful Kurapika, and rebellious ex-assassin Killua. To attain their own goals and desires, together the four of them take the Hunter Exam, notorious for its low success rate and high probability of death. Throughout their journey, Gon and his friends embark on an adventure that puts them through many hardships and struggles. They will meet a plethora of monsters, creatures, and characters\u2014all while learning what being a Hunter truly means.\\n\\n(Source: MAL Rewrite)",
        popularityRank: 9,
        ratingRank: 35
    },
    {
        _id: "41370",
        title: "Demon Slayer: Kimetsu no Yaiba",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/41370/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/41370/original.jpg"
        },
        episodeCount: 26,
        watchedEpisodes: [1, 2],
        completed: false,
        startedWatching: new Date("2024-05-30"),
        finishedWatching: null,
        rating: 6,
        apiLink: "https://kitsu.io/api/edge/anime/41370",
        synopsis: "It is the Taisho Period in Japan. Tanjiro, a kindhearted boy who sells charcoal for a living, finds his family slaughtered by a demon. To make matters worse, his younger sister Nezuko, the sole survivor, has been transformed into a demon herself. Though devastated by this grim reality, Tanjiro resolves to become a \u201cdemon slayer\u201d so that he can turn his sister back into a human, and kill the demon that massacred his family.\\n\\n(Source: Crunchyroll)",
        popularityRank: 10,
        ratingRank: 15
    },
    {
        _id: "8699",
        title: "The Seven Deadly Sins",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/8699/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/8699/original.jpg"
        },
        episodeCount: 24,
        watchedEpisodes: [1],
        completed: false,
        startedWatching: new Date("2024-10-31"),
        finishedWatching: null,
        rating: 3,
        apiLink: "https://kitsu.io/api/edge/anime/8699",
        synopsis: "In a world similar to the European Middle Ages, the feared yet revered Holy Knights of Britannia use immensely powerful magic to protect the region of Britannia and its kingdoms. However, a small subset of the Knights supposedly betrayed their homeland and turned their blades against their comrades in an attempt to overthrow the ruler of Liones. They were defeated by the Holy Knights, but rumors continued to persist that these legendary knights, called the \\\"Seven Deadly Sins,\\\" were still alive. Ten years later, the Holy Knights themselves staged a coup d\u2019\u00e9tat, and thus became the new, tyrannical rulers of the Kingdom of Liones.\\n\\nBased on the best-selling manga series of the same name, Nanatsu no Taizai follows the adventures of Elizabeth, the third princess of the Kingdom of Liones, and her search for the Seven Deadly Sins. With their help, she endeavors to not only take back her kingdom from the Holy Knights, but to also seek justice in an unjust world.\\n\\n(Source: MAL Rewrite)",
        popularityRank: 11,
        ratingRank: 131
    },
    {
        _id: "10028",
        title: "A Silent Voice",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/10028/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/10028/original.jpeg"
        },
        episodeCount: 1,
        watchedEpisodes: [],
        completed: false,
        startedWatching: new Date("2025-03-18"),
        finishedWatching: null,
        rating: 7,
        apiLink: "https://kitsu.io/api/edge/anime/10028",
        synopsis: "Shoya is a bully. When Shoko, a girl who can't hear, enters his elementary school class, she becomes their favorite target, and Shoya and his friends goad each other into devising new tortures for her. But the children's cruelty goes too far. Shoko is forced to leave the school, and Shoya ends up shouldering all the blame. Six years later, the two meet again. Can Shoya make up for his past mistakes, or is it too late?\\n\\n(Source: Kodansha Comics)",
        popularityRank: 12,
        ratingRank: 48
    },
    {
        _id: "8671",
        title: "Attack on Titan Season 2",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/8671/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/8671/original.jpg"
        },
        episodeCount: 12,
        watchedEpisodes: [1, 2, 3, 4, 5],
        completed: false,
        startedWatching: new Date("2023-07-19"),
        finishedWatching: null,
        rating: 3,
        apiLink: "https://kitsu.io/api/edge/anime/8671",
        synopsis: "Eren Jaeger swore to wipe out every last Titan, but in a battle for his life he wound up becoming the thing he hates most. With his new powers, he fights for humanity's freedom facing the monsters that threaten his home. After a bittersweet victory against the Female Titan, Eren finds no time to rest\u2014a horde of Titans is approaching Wall Rose and the battle for humanity continues!\\n\\n(Source: Funimation)",
        popularityRank: 13,
        ratingRank: 51
    },
    {
        _id: "12",
        title: "One Piece",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/12/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/12/original.png"
        },
        episodeCount: null,
        watchedEpisodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        completed: false,
        startedWatching: new Date("2024-06-01"),
        finishedWatching: null,
        rating: 9,
        apiLink: "https://kitsu.io/api/edge/anime/12",
        synopsis: "Gol D. Roger was known as the \\\"Pirate King,\\\" the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece\u2014which promises an unlimited amount of riches and fame\u2014and quite possibly the pinnacle of glory and the title of the Pirate King.\\nEnter Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy\u2019s reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes\u2014One Piece.\\n[Written by MAL Rewrite]",
        popularityRank: 14,
        ratingRank: 44
    },
    {
        _id: "13569",
        title: "Attack on Titan Season 3",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/13569/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/13569/original.jpg"
        },
        episodeCount: 12,
        watchedEpisodes: [1, 2, 3],
        completed: false,
        startedWatching: new Date("2024-05-15"),
        finishedWatching: null,
        rating: 8,
        apiLink: "https://kitsu.io/api/edge/anime/13569",
        synopsis: "After recovering Eren and Historia, the recruits are put under the care of Levi. Stuck out in the middle of nowhere, Hange subjects Eren to a series of experiments in an attempt to find out more about his ability. But when their link to the secrets behind the wall is murdered, the squad must move out and find a new refuge. Except, a figure from Levi\u2019s past has his own plans to stop them.\\n\\n(Source: Funimation)",
        popularityRank: 15,
        ratingRank: 37
    },
    {
        _id: "176",
        title: "Spirited Away",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/176/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/176/original.jpg"
        },
        episodeCount: 1,
        watchedEpisodes: [],
        completed: false,
        startedWatching: new Date("2024-10-08"),
        finishedWatching: null,
        rating: 10,
        apiLink: "https://kitsu.io/api/edge/anime/176",
        synopsis: "Stubborn, spoiled, and na\u00efve, 10-year-old Chihiro Ogino is less than pleased when she and her parents discover an abandoned amusement park on the way to their new house. Cautiously venturing inside, she realizes that there is more to this place than meets the eye, as strange things begin to happen once dusk falls. Ghostly apparitions and food that turns her parents into pigs are just the start\u2014Chihiro has unwittingly crossed over into the spirit world. Now trapped, she must summon the courage to live and work amongst spirits, with the help of the enigmatic Haku and the cast of unique characters she meets along the way.\\nVivid and intriguing, Sen to Chihiro no Kamikakushi tells the story of Chihiro's journey through an unfamiliar world as she strives to save her parents and return home.\\n[Written by MAL Rewrite]",
        popularityRank: 16,
        ratingRank: 90
    },
    {
        _id: "41982",
        title: "Attack on Titan Season 3 Part 2",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/41982/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/41982/original.jpg"
        },
        episodeCount: 10,
        watchedEpisodes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        completed: false,
        startedWatching: new Date("2025-01-19"),
        finishedWatching: null,
        rating: 4,
        apiLink: "https://kitsu.io/api/edge/anime/41982",
        synopsis: "The battle to retake Wall Maria begins now! With Eren\u2019s new hardening ability, the Scouts are confident they can seal the wall and take back Shiganshina District. If they succeed, Eren can finally unlock the secrets of the basement\u2014and the world. But danger lies in wait as Reiner, Bertholdt, and the Beast Titan have plans of their own. Could this be humanity\u2019s final battle for survival?\\n\\n(Source: Funimation)",
        popularityRank: 17,
        ratingRank: 29
    },
    {
        _id: "10877",
        title: "Assassination Classroom Second Season",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/10877/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/10877/original.jpg"
        },
        episodeCount: 25,
        watchedEpisodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        completed: false,
        startedWatching: new Date("2025-01-09"),
        finishedWatching: null,
        rating: 6,
        apiLink: "https://kitsu.io/api/edge/anime/10877",
        synopsis: "The students return as school is back in session for the second semester. Following their exploits on the island during summer vacation, Class 3-E continues to sharpen their blades with their sights set on their teacher, the slippery Koro-sensei. They have more to worry about than just their teacher, however, as enemy assassins, both old and new, are out for the increased bounty on the octopus' head.\\n\\nMoreover, their rivals in Class A, as well as Kunugigaoka Junior High's fearsome principal, stand to block Class E from achieving academic excellence. With all of these obstacles opposing them, the group must continue to work together in order to overcome their foes and accomplish their goal of successfully assassinating their teacher.\\n\\n(Source: MAL Rewrite)",
        popularityRank: 18,
        ratingRank: 60
    },
    {
        _id: "8133",
        title: "Haikyu!!",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/8133/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/8133/original.jpg"
        },
        episodeCount: 25,
        watchedEpisodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        completed: false,
        startedWatching: new Date("2025-01-04"),
        finishedWatching: null,
        rating: 6,
        apiLink: "https://kitsu.io/api/edge/anime/8133",
        synopsis: "Inspired after watching a volleyball ace nicknamed \\\"Little Giant\\\" in action, small-statured Shouyou Hinata revives the volleyball club at his middle school. The newly-formed team even makes it to a tournament; however, their first match turns out to be their last when they are brutally squashed by the \\\"King of the Court,\\\" Tobio Kageyama. Hinata vows to surpass Kageyama, and so after graduating from middle school, he joins Karasuno High School's volleyball team\u2014only to find that his sworn rival, Kageyama, is now his teammate.\\n\\nThanks to his short height, Hinata struggles to find his role on the team, even with his superior jumping power. Surprisingly, Kageyama has his own problems that only Hinata can help with, and learning to work together appears to be the only way for the team to be successful. Based on Haruichi Furudate's popular shounen manga of the same name, Haikyuu!! is an exhilarating and emotional sports comedy following two determined athletes as they attempt to patch a heated rivalry in order to make their high school volleyball team the best in Japan.\\n\\n(Source: MAL)",
        popularityRank: 19,
        ratingRank: 72
    },
    {
        _id: "8640",
        title: "Assassination Classroom",
        coverImage: {
            tiny: "https://media.kitsu.app/anime/poster_images/8640/tiny.jpg",
            original: "https://media.kitsu.app/anime/poster_images/8640/original.jpg"
        },
        episodeCount: 22,
        watchedEpisodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        completed: true,
        startedWatching: new Date("2024-08-11"),
        finishedWatching: new Date("2024-09-29"),
        rating: 1,
        apiLink: "https://kitsu.io/api/edge/anime/8640",
        synopsis: "When a mysterious creature chops the moon down to a permanent crescent, the students of class 3-E of Kunugigaoka Middle School find themselves confronted with an enormous task: assassinate the creature responsible for the disaster before Earth suffers a similar fate. However, the monster, dubbed Koro-sensei (the indestructible teacher), is able to fly at speeds of up to Mach 20, which he demonstrates freely, leaving any attempt to subdue him in his extraterrestrial dust. Furthermore, the misfits of 3-E soon find that the strange, tentacled beast is more than just indomitable\u2014he is the best teacher they have ever had!\\n\\nAdapted from the humorous hit manga by Yuusei Matsui, Ansatsu Kyoushitsu tells the story of these junior high pupils as they polish their assassination skills and grow in order to stand strong against the oppressive school system, their own life problems, and one day, Koro-sensei.\\n\\n(Source: MAL Rewrite)",
        popularityRank: 20,
        ratingRank: 69
    }
]);
