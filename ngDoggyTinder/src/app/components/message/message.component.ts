import { MessageService } from './../../services/message.service';
import { Component, OnInit } from '@angular/core';
import { Dog } from 'src/app/models/dog';
import { DogService } from 'src/app/services/dog.service';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  thisDog: Dog;
  thatDog: Dog;
  convo: Message[] = [];
  text = '';

  constructor(private messageS: MessageService, private dogServe: DogService) {}

  ngOnInit() {
    this.thisDog = this.messageS.getThisDog();
    this.thatDog = this.messageS.getThatDog();
    this.getConversation();
  }

  getConversation() {
    this.messageS
      .getConversation(this.thisDog.id, this.thatDog.id)
      .subscribe(data => {
        for (const mess of data) {
          if (mess.read === false) {
            mess.read = true;
            this.messageS.update(mess).subscribe();
          }
          this.convo = data;
        }

        this.convo = this.convo.sort((a: Message, b: Message) => {
          if (a.date < b.date) {
            return -1;
          }
          return 1;
        });
      });
  }

  setMessageStyle(dogId: number) {
    if (dogId === this.thisDog.id) {
      return 'sender';
    } else {
      return 'receiver';
    }
  }

  addMessage() {
    this.messageS
      .add(this.text, this.thisDog.id, this.thatDog.id)
      .subscribe(data => {
        this.getConversation();
        this.text = '';
      });
  }
}
