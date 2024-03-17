import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  private readonly pb: PocketBase = new PocketBase(environment.baseURL);

  public record(collection: string) {
    return this.pb.collection(collection);
  }

  public unsubscribe(collection: string) {
    this.pb.collection(collection).unsubscribe('*');
    this.pb.collection(collection).unsubscribe('');
  }
}
