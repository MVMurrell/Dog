import { UserService } from './../../services/user.service';
import { DisLike } from './../../models/dis-like';
import { Likes } from './../../models/likes';
import { DisLikeService } from './../../services/dis-like.service';
import { LikeService } from './../../services/like.service';
import { DogService } from './../../services/dog.service';
import { Component, OnInit } from '@angular/core';
import { Dog } from 'src/app/models/dog';
import { forEach } from '@angular/router/src/utils/collection';
import { MatchService } from 'src/app/services/match.service';
import { Matches } from 'src/app/models/matches';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  likes: Likes[];
  dogs = [];
  selectedDog = new Dog();
  matches: Matches[];
  popUpDog = new Dog();
  dislikes: DisLike[];
  possibleMatches: Dog[];

  constructor(private matchService: MatchService, private dogService: DogService,
              private likeService: LikeService, private disLikeService: DisLikeService,
              private userS: UserService) { }

  ngOnInit() {
    this.selectedDog = this.dogService.getSelectedDog();
    this.loadMatches(this.selectedDog.id);
    this.loadLikes(this.selectedDog.id);
    this.loadDislikes(this.selectedDog.id);
    this.getUser();
    this.getDogsThatLikeThisDog(this.selectedDog.id);
    // this.dogs = this.getAllDogs();
  }

  getUser() {
    this.userS.getLoggedInUser().subscribe(data => {
      this.user = data;
    });
  }

  getAllDogs() {
    this.dogService.index().subscribe(
      data => {
        this.dogs = data;
      },
      error => console.log(error)
    );
  }

  loadMatches(selectedDogId: number) {
    this.matchService.index(selectedDogId).subscribe(
      data => {
        this.matches = data;
      },
      error => console.log(error)
    );
  }

  loadLikes(selectedDogId: number) {
    this.likeService.getByThisDog(selectedDogId).subscribe(
      data => {
        this.likes = data;
      },
      error => console.log(error)
    );
  }

  loadDislikes(selectedDogId: number) {
    this.disLikeService.index().subscribe(
      data => {
        this.dislikes = data;
      },
      error => console.log(error)
    );
  }

  likeDog(thatDogId: number) {
    this.likeService.addLike(this.selectedDog.id, thatDogId).subscribe(
      data => {
        this.likeService.getByThisDog(thatDogId).subscribe(
          likeList => {
            likeList.forEach(like => {
              if (like.thatDog.id === this.selectedDog.id) {
                this.matchService.addMatch(like.thatDog.id, thatDogId);
                this.loadMatches(this.selectedDog.id);
                this.popUpCaller(thatDogId);
              }

            });
          },
          error => console.log(error)
        );
        this.loadMatches(this.selectedDog.id);
      },
      error => console.log(error)
    );
  }

  dislikeDog(thatDogId: number) {
    this.disLikeService.addDislike(this.selectedDog.id, thatDogId).subscribe(
      data => {
        this.loadMatches(this.selectedDog.id);
      },
      error => console.log(error)
    );
  }

  popUpCaller(thatDogId: number) {
    this.dogService.getOneDog(thatDogId).subscribe(
      data => {
        this.popUpDog = data;
      },
      error => console.log(error)
    );
  }

  getDogsThatLikeThisDog(thisDogid: number) {
    this.likeService.getByThatDog(this.selectedDog.id).subscribe(
      data => {
        for (const like of data) {
            this.dogService.getOneDog(like.thisDog.id).subscribe(
              data => {
                this.possibleMatches.push(data);
              },
            );
        }
      }
    );
  }

  // isLoggedin() {
  //   this.auth.checkLogin().subscribe(
  //     data => {
  //       this.user = data;
  //     }
  //   );
  // }
}
