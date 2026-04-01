import { Component, OnInit } from '@angular/core';

interface Childtracker {

  id: number;
  title: string;
  image:any;
  content:string;
}

@Component({
  selector: 'app-milestone-tracker',
  templateUrl: './milestone-tracker.component.html',
  styleUrls: ['./milestone-tracker.component.sass']
})
export class MilestoneTrackerComponent implements OnInit {
  constructor() { }

  eventsData :Childtracker[]= [
    //1-4 months child data
    {
      id: 0,
      title: 'My last travel baby',
      content: 'May look more like a chubby, "roly-poly" infant than a newborn.',
      image: '/assets/images/2mnthimg-2.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'Builds strenght with regular tummy time.',
      image: 'assets/images/2mnthimg-1.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'Establishes good feeding pattern, but may experience reflux',
      image: 'assets/images/2mnthimg-5.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'Takes 3-4 naps a day; probably waking up 1-2 times a night.',
      image: 'assets/images/2mnthimg-3.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'Recognizes faces of parents, caregivers, and close family members.',
      image: 'assets/images/2mnthimg-4.png'
    },

  ];

  eventsDatachild :Childtracker[]= [
    //5-7 months child data
    {
      id: 0,
      title: 'My last travel baby',
      content: 'They may understand the word "No".',
      image: '/assets/images/8mnthimg-2.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'Stranger & separation anxiety can develop.',
      image: 'assets/images/8mnthimg-6.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'They will start to sit up (with help at first)',
      image: 'assets/images/8mnthimg-3.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'Birth weight doubles by around 6 months.',
      image: 'assets/images/5mnthimg-1.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'Hearing & eating solids starts from 6 months.',
      image: 'assets/images/5mnthimg-2.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'They may imitate your facial expressions',
      image: 'assets/images/8mnthimg-7.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'teeth can start to come through.',
      image: 'assets/images/5mnthimg-3.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'They might start crawl!',
      image: 'assets/images/8mnthimg-1.png'
    },

  ];

  eventsDatachildmonth :Childtracker[]= [
    //8-10 months child data
    {
      id: 0,
      title: 'My last travel baby',
      content: 'They hear and respond well on their own name.',
      image: '/assets/images/8mnthimg-2.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'if they are not already, they might start crawling.',
      image: 'assets/images/8mnthimg-1.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'They can sit up by themselves.',
      image: 'assets/images/8mnthimg-3.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'They may become fixated with a favourite toy.',
      image: 'assets/images/8mnthimg-4.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'They can see right across the room.',
      image: 'assets/images/8mnthimg-5.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'Empathy can develop- they may cry when others do.',
      image: 'assets/images/8mnthimg-6.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'Vowels sounds can turn into "Mama" and "Dada".',
      image: 'assets/images/8mnthimg-7.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'They might even start walking!',
      image: 'assets/images/8mnthimg-8.png'
    },

  ];

  milestoneChildmonth :Childtracker[]= [
    //8-10 months child data
    {
      id: 0,
      title: 'My last travel baby',
      content: 'They might start walking!.',
      image: '/assets/images/8mnthimg-8.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'They will recognise their favourite songs.',
      image: 'assets/images/11mnthimg-1.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'They might start saying "Mama" and "Dada".',
      image: 'assets/images/11mnthimg-2.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'Their vision is almost as good as an adults.',
      image: 'assets/images/8mnthimg-5.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'They can recognise and point to objects.',
      image: 'assets/images/11mnthimg-3.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'They understand words like "No".',
      image: 'assets/images/8mnthimg-2.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'They might get lots of colds.',
      image: 'assets/images/8mnthimg-6.png'
    },
    {
      id: 1,
      title: 'My Job Baby',
      content: 'Their personality will start to shine through.',
      image: 'assets/images/8mnthimg-7.png'
    },

  ];

  

  

  ngOnInit(): void {
  }

}
