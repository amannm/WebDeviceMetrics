device
======

A collection of javascript utilities mostly related to figuring out physical details about a device

getZoom
======
Usage: Initialize the function after 'document' is ready
Function: Returns a value corresponding to the amount of physical device pixels per CSS Layout "px" 

Total Zoom =  Page Zoom *  System Zoom 

System Zoom:
In general this is the baseline zoom applied at the system level whose value was decided on by the developers of the device as optimal for viewing and interacting with the assets of the target operating system. 

Page Zoom:
Has traditionally been limited to desktop style browsers and allows users to adjust the size of webpage features on the fly, usually using some sort of slider or keyboard shortcut.

Corporation specific attitudes towards providing device metrics via Javascript
=====

Apple:
They strongly believe that window.devicePixelRatio, screen.width, and screen.height should represent static values hardcoded into the machine and used as a sort of unique identifier. screen.width and screen.height reveal the product-line/form-factor (iPhone, iPad, Macbook, Mac) and window.devicePixelRatio indicates whether or not it needs to be served high resolution content to avoid looking like crap. In all honesty I despise Apple due to their company philosophy of going out of their way to prevent people like me whose joy in life is tinkering, exploring, inventing, learning how things work--from doing anything but. They pretty much showed up out of nowhere and started consuming a technical area that had otherwise been across the board perfect in accomodating all the things I love doing. Anyways... despite all that, I have to agree with Apple in that keeping and using the device variables in a static manner makes more sense from the standpoint of a developer who aims to make finely crafted, device-tailored software. I wish Google would have just played along with this even though it is obviously no-comprimises optimized toward how Apple has developed their product line.

Google:
Google also chose to interpret standards in a way that favored their business model. It is possible that they predicted that developers would prefer designing web applications with an abstract rendering surface in mind instead of getting caught up with the inevitable quirks that come with having so many different hardware device configurations in the wild and relatively disconnected partners with their own interpretation of standards. The strategy they chose might have also been to avoid the kind of overhead required to ensure all android implementers were conforming to a more well defined standard. They would have to spend time dealing with disagreements over details such as landscape vs portrait being the "default orientation" that developers are expected to use to differentiate all their devices from one another. Regardless of why they chose to do it this way, It's still annoying as hell. Just make every handheld thing report portrait dimensions. Make every you can't hold up with one hand a goddamn landscape device. It's possible I just don't have the genius insight that Google employees do to see how it would be anything but annoying as hell to have the dimensions change along with the orientation when there are already fifteen different ways to figure out orientation seperately without having to irreversibly convolute it with the ONLY values available that can give a developer any sort of hint towards what size their text or pictures or whatever are showing up in the real world. Its not worth it to have to resort to shaky unmaintainable workarounds or massive user-agent-string libraries just to be able to differentiate a 14" laptop from a landscape 10.1" tablet.

Not too concerned making window.devicePixelRatio dynamic and properly reflecting page zoom of Webkit desktop because they probably don't see it worth their investment to figure out how to conceptually unify viewport zoom and pinch zoom and page zoom and all the other zooms just for desktop Chrome users, especially when they have Apple sitting there. However their new Chromebook Pixel jaunt makes me wonder if they just might HAVE to start caring about unifying definitions across mobile and desktop.

Microsoft:
Out of all the big players, Microsoft surprisingly makes it the easiest for developers to find out not only the system level zoom but also the on the fly adjustments of page zoom. Ahhhhh.. why can't everything be as simple and well defined and reliable as deviceXDPI, systemXDPI, and logicalXDPI? (Except for their worthless implementation on Windows Phone 8. They screwed up -BIG- time). Also I wish they would stop using the misleading "DPI" units everywhere like 96dpi, 120dpi, 144dpi. What the hell is the point when you can just use 1.0x 1.25x 1.50x ?

