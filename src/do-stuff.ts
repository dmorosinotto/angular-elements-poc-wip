import {NgElementConstructor, NgElementWithProps} from './@angular/elements';

export function doStuff(): void {
  interface WithName {
    name: string;
  }

  // Access upgraded element 2.
  const upgraded2 = document.querySelector('my-greet-2') as NgElementWithProps<any, WithName>;

  // Access upgraded element 4.
  const p4 = document.createElement('p');
  p4.innerHTML = `
    <b>"Greet4Component":</b>
    <my-greet-4 name="person4">
      <div>All good?</div>
      <button class="delete-btn">Can't touch this</button>
    </my-greet-4>
  `;
  document.body.appendChild(p4);

  const Greet1NgElement: NgElementConstructor<any, WithName> = customElements.get('my-greet-1');
  const host = p4.querySelector('my-greet-4') as HTMLElement;

  const upgraded4 = Greet1NgElement.upgrade(host);

  // Access upgraded element 5.
  const p5 = document.createElement('p');
  p5.innerHTML = '<b>"Greet5Component":</b>';
  document.body.appendChild(p5);

  const upgraded5 = document.createElement('my-greet-3') as NgElementWithProps<any, WithName>;
  upgraded5.name = 'personV';
  upgraded5.innerHTML = '<div>Nice to see you.</div>';
  p5.appendChild(upgraded5);

  // Access upgraded element 6.
  const p6 = document.createElement('p');
  document.body.appendChild(p6);
  const Greet2NgElement: NgElementConstructor<any, WithName> = customElements.get('my-greet-2');
  const upgraded6 = new Greet2NgElement();
  upgraded6.id = 'six';
  upgraded6.name = 'personVI';
  upgraded6.innerHTML = `
    <div>Now you see me.</div>
    <button class="delete-btn" onclick="javascript:six.disconnectedCallback()">
      Now you don't!
    </button>
  `;
  upgraded6.connectedCallback();   // Optional, but fun!
  p6.appendChild(upgraded6);

  // Modify properties and listeners.
  const listener2 = () => console.log('*greet2*');
  const listener4 = () => console.log('*greet4*');
  upgraded2.addEventListener('greet', listener2);
  upgraded4.addEventListener('greet', listener4);

  upgraded2.name = 'person2.5';
  upgraded4.name = 'person4.5';

  // Modify properties and listeners.
  setTimeout(() => {
    upgraded5.setAttribute('name', 'person5');
    upgraded6.setAttribute('name', 'person6');
  }, 2500);

  setTimeout(() => {
    upgraded2.name = 'person2';
    upgraded4.name = 'person4';

    upgraded2.removeEventListener('greet', listener2);
    upgraded4.removeEventListener('greet', listener4);
  }, 5000);
}
