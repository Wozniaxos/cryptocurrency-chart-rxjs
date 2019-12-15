import { Observable } from "rxjs";
import { timestamp } from 'rxjs/operators';

const generateCryptoValue = () => {
  return Math.round((Math.random() * (600 - 500) + 500) * 100) / 100;
}

export const bitcoinSource = new Observable(subscriber => {
  setInterval(
    () => subscriber.next(generateCryptoValue()),
    1000
  )
}).pipe(timestamp())

export const ethereumSource = new Observable(subscriber => {
  setInterval(
    () => subscriber.next(generateCryptoValue()),
    1000
  )
}).pipe(timestamp())