import HCard from "../../cards/Hackahon Cards/HCard";
import { useEffect , useState } from "react";
import axios from "axios";
// const data = [
//   {
//     hackathonName: "Code Wiz 3.0",
//     mainTechStack: "DSA",
//     sideTechStack: "CP",
//     imgUrl:
//       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAh1BMVEX///8AAAD29vZTU1P7+/vm5ubr6+vX19esrKyysrK+vr709PTp6enx8fHY2Nj5+fmMjIyUlJTHx8ff39+jo6O4uLhnZ2eGhobOzs5MTEx4eHiPj4+cnJxsbGw+Pj4oKCghISEYGBg2NjYMDAxGRkZ3d3ddXV06OjovLy8mJiYVFRVgYGBpaWl/qcHwAAAW0UlEQVR4nO1d6XaqOhQGBARUVFBBxQGnWtv3f74LSXYGCEgiPe1dy+/H8VghZCd7zk4wjDfeeOONN95444033njjjTfeeOMFjJw4HALCeGz9dof6ghMtktXJlGG/m3mp+9sd1Ic99DZ7KWUi1sky/u2+KmOazgcdaKM4fy3C3+5zd7j+TYU4QL4L/g+COVl0Ycsm3Jb2bxPQCnu5fkbC+dkF39FvU9GIOGno83F9zbwodlyrnB975Dph4M2/Lw/55fn8T6rWSKpVLht/OGm6xZ6k3vVDdtvuz6mc5b3ey9ti2EWirHQuYez1n+JUP6/2775NVRqwo6TGrx9/hsTgWOnafuFoNBNuD1X+HvbeVw2kl8rcZTrUYQyTipL90m+rJ0x2Yo++lTizDjuo6KrZ7xrGhdibeaPCVICzEdp8BD20qYlYiBI+/b7anc4FEm+jvhpWhNCN+7LPpu1MEMZe2+6KMe9zHnubPcA04yncTftu/ymW/PMXbVeyQB6j6xMs3vN7/GuLwSuCa2uUE4h6yLx0f4jDa9TWQewbLqddPp6MbV4hUEkpBpworv6dwUgVBnZboc9Ue5TNscr9XwUZHsdv42cXz+YFFgjl/7bKVi3lHMEXvYiO4OYk63bH9HEocNJ94FWTv19+3LFr0IY1/lb7kZye+nlV80Wf9d1Z6LGeecFvdpnN1R+mbhhojCXWSQMjKAWxcErQZ2D4C4KsQ1qU6Zrkhd4/B6NPQd6/iPigD8+w0efSYnzXJVvo/RMKaWrhqKCxJ/gWIkm24eOvzBXbdWom/QcUUvrWKjYXVMyAdA7J08xg2r+jF+Ycf5pCmq9eKd2GExHuGH2ERow+x3hCHMO2Ow+W9fGzFK6g+Y3SbaBikPncGwZyodfGDv9VCTZlobnajZ2w0Rw+nNOgKgZ/EhWjbLepkvNU73yKuSZ9WMWciYoxQMWgXMdRvRuUwr5zijT8uyreuCAqBnHX+Xgkg3TAX/PcfOrNiqA5vH7XFIfQ7JfqnVjFjF2Th0PbUxVDYwrJ03OfmZoJhGUK0SoGqJgZT9/FYMlGZTGcmLp9aQHwRa68QvlNqEAfuzmORJbYmbmW4ZN6Z0KgUE2bt4EmRxTlpTBdmJuoiiGfC/JVDzS46CvZFkGD6poLVMyAjDhSNYnxWX7MtDtENXo/iX3K9BrWVerFOFgwX0hAgE+112+CA5iem/qtmJI19mI+CK8TFbN34jDUJRLW2vqIDiFOOWuUQIAXg5Qw9WKmJoWuMaOK5vWVYGrANBI+I3wn0QoW8Ra4FZtv7W5BsHXQbgEA7K7jwEOghKxM4QJ94IZYoPSCNwKC8yqTgot217k58At4E8MrP8bGFH26VvmB8EqOzO1hkEr0x+t9A3TD+qVWwMTr26yfAwSHr5h7h7Rx/IsFVtC58wttQBL0Zwo6JsPIjxxl948CHJqO+XUJIKjRMPHP4UBEMdCuMQR1rN0AcPlP1HJwKzjaTht43bo5qOjF+9sg1O1pu5Tr10YIosAfKFO9mgIalgFsJ4yCoMXQgQzpTQGkkjVTdKG3SJuUry/SZ+atVx2aKxzAz9KqzwFnSKvAwceBkjy7Z5tVyFLJ3DpkY+ImfmES4F4dJezQNXzp3UKChsxSzW0TqnAasxMwhRqGGhK9GhLIF1ZIfLyJKcNj2diGvBkEiJvU63RIqKPjrQ/5nkmWjpoqn/mUpFv5rVGNEEFSDwYgaFMXX1soba07UvIJLMGUqV0tHW30x8CWKRcKnRon4BkysWu1J1cKMDlQgZ3UtyY0GgvSUdWMO/C2nPfDKGq2TpWeVfOzQ1OOx4wyS622hifeqOgTcIkUlT2RE1npx5RY6QbpjKpdq2T7P2XUnbl1eqdaIY3Awj5f9FtgKVxRzZC7ZHaMLn8cpT5qffgFBZHVfi6w4obfkl1gcmniIZfJKTUvUfdqixzgxUjmnfeyZAxc3yLAM6lcw/D31ziAgE6xxVzPYakigOeV1CEZFYmKEZ8vsa+1ngnB5LX2s1lj9iCR7TekZnLC+OoDMQdhaaU1UVnfEEQbIDFPtSkS2nCqvzY8xqrvxKCPiun1Cyx4hOtVolYy6xLj81V5bC1QqXGYwMZyEyGzYbWhoPouNkfwH8xBcKmCz0X8wJptGV6qj63xRc3P5EOhsZQ+aUBdtyZwlQsDcgTNSbYVKWQhiQxUWMeRbL+qSWlNxxzbqMeQJM29+lVUUh94zDKqvch8dI8KQY5EHRrWn1mY5+q99f2By7YfEerBznfbozL8PzYwcX0o20E8+YrUyntXGX2JFmHRbJMTU3Mn5KJKH3W4b7M04MxPji/onLkgbkxFvpZVBYMh8rGEtVg7DRxa65nMVTM5FiQlT4w1iPHpnAImrm5N9kdLGesIrL+SXED7L/XS6j2r1ukDuMTGXfwaSHrSAuIsSSMUW+Io3sfVWysgLCg3giWElYFp42XMXy0p4pxPEj12DQqJqMgjJRkPshmQ/gpMWk01MQgLKE3xMB9RWBVqiKHomLjw+F5VkUofDcaO+lg7bxn5PjhmmJuom3berweH/YntiuU7W43lOXCZmUdpDJmCI013XAMjjqg84pMTSOYQElU5evQksAJCBNJENEovHIjQMuxhCJPFpw3J3x7X1aZEwhlfLow4FrM1YB4QYY6O7iix1fIfG5gQ63BQk/hIg4KGgIxHmRZkXurFKA8jKQYwAn3CvCyQwMMCDcqYH1FmF+yCX3kZIiPbTcvY50prApiJus6zZO4vIHFX6lzy3+NkMgy9+9yxU39FKWBe6tqNjWwTukaaEW5hdWcQL97HSInbvE5lC/Klz8erXjIs3RZDJ62jAeZ+kMbFEDsu7VFuUQ5FHkLRdSeMZ8Q0BHyis2BR624OHDfckJ9ZLAem5GD5RXv5OWf0cZwcFYModOtUuaANhCfadUw+9Q27cOUmTOltqJr8NkK7jDsCI4LTERLeS93gpF1sRG5SIRDGyHwMI7samRxpN3ziZo0CYiyu1YFqAeEJedkISFmyjO042WWzGes39BYpg2kx9MOJC+cj7PltaIOhX/oS1tgKiHdEZZBO88NYjo3pJLI4w8ukJsLc6FE/lvBRp4W+rG0wqB3w3LTqWq7AjbkazqR0hxx3uYRZ5UOltRMUDZ2McToMKlNDTcc9DMoeuAYX3TOtEpQ60B4wPz1qm5UKyDxIf6O99J1hk8tYUJoFob3H4wlsxiuLXTzy13gIMctTb5sx5cGIIivZ7uacj8/i0+K6ePppPqgpI6zdKbW2E58pgE7aNQ6nlT3mDIMsHJbaIiiUICWQG45SBo/lELoW/plqP2b7D0bsxKYIlrsp+GJ2MHPGZcRH7LTfCEuNPMNBpyHyluI2Xh7rIB1NbuUUTegdvBu+M9LoYH6yBkFjc0b2ULD55DQ4XTgWZXoPWxc+CMFXdCp3wS3KU+GUwIltN3r9Zm46Tlqoi7gQRR/6y3kkX4UpSlbLYeg4WB5IsoH30g7GMBUfyeckkOYRHLNDS68rwHkz+ZIilRG3ILAxvDO9oWWNlo4bxzFRkwODOzeGcodLSMLhyIgPqQujjlUi58nYQjdEO3YjQ9cBpI/S36hUuO60MUVrmh/F3GF3FG648gmBa2rYVslfHh5M7GunQiSWw+Y7Flyw3l/MWiZ7Q8axM4Hy6Jj6k3HRxWYCzf0SnT5lU6Hy+ITw8XIwr6sBZdpzkjqpPF/Ag7IkYvuKGcPj0KkSH7fWUNwEai4bDVMnWOySecMRY4/D5cAlGdN6xlsVVGgmuEER2EPoVJACPZICGObTAKdBsIaNZ26NXiaQjnhauqs1BluoEtgQO9Lc4b60scVFqbBc1BS0P9riWAw0Nmv52hknXGPEMXUB8lUJbPLqmDLc7742h8NFOFVrKF0dKy15C4HLYL71o5P5/cg4NSaAhjao/YMkFl/2RWBzYqVEbEhO5zJLwzCS/h11t2zW+9ilMTLcEut6BvYcotGU1pQEqgQ2LlG3Hm0XG650gexLsqwGQKkkLl0U5ZULgKAxavogV3/KLNpYtdCQlMEoVZPsADmvhcD6olC04iQxuebOxLKGHmp337TCoqxkmmtgmx0YosolifeJYTRoDznD5UXAmW3ni4BLhBTImpPzmSqBLWtRzQc0rrHk1hbZSoav/5Ebk+oYfrJppYWz5nfb2gMedgVD3xJZWU2TQcKewpOu/uBwe7irqEXWbgBhzyhcUIbftwezG64DnQhsq8EbSQ9cLDHCz6qtdE5a6n/EY2LiG9Ji+6/b1y3nrnrmZeJorNMyNg48aqIxnvu30xfJ7wUNDPdtpNe86EzlbLTSbZBZyAdWyecc3IqoaZ6fpnTxmHcqzMJ9r1VwljqaK4cI5Wf4NrnM+T1v+AXjttqu7lIbevOjtqJfAL64U+YXT3ZNXM1KQuBUl7SfwDnZzrocV4Kv7lTcirmruniWViT4WhiSybzV6utjPdiLLV+H4/aVI7I012lxgqQmK/Z3Jjg3TiErQXo7Swn8/J5vNtdNo65txC7LtpcEGNKKw3TJ1QR9LFpoJO5Hpx0sJJckujI2r3Zk5RYU1IBySbfHMktmiZnXrz7np8t6UVoKhyiaavWY63Ep8bT6a0y6SSLrTlvRSKAuRiQ3zv22K/N2v/LagTIy515/oD88VjUnqNueISdiSnk984Ioip2R41/XX59AEtEHncoQiA0TMnA7bgKXrBr3PthkZQLa5o0clQPmdmONlQxqhUCdTzNwS9V3qnMOTBme5W77tEjRP28zS+tUfFhu6pMzXL+SbeBy/MIvG8KSPUvt41kNd6K/trmoFCL7ZTLaSW6X1QpTc9okHlUUuFcdt9AQP4V+D/PiWzJjjHlN6tEizUAl7LwEqiAwixqBGOyNnI1KhWAh0ydw65YPUd6IEu1Y1/wtTIRb9bFyuVMIofg6vs0Jhcx5AZL5KoyC5y2lkvAy5AOhneRCIRYZuI4nhZF+YXVYXYC4NVbbQKBoRXBgPd1fmVHVyklRORtquzfHCdN9sWDVifbquFOccFvp9ixFY3b320q/iSbLjBQ4CZxylxLIJlVrQ1XEgo9iPjMqghc2Zh1Asrun4UbcvXB5Vq9Y4Ue2nMlSdCwfoHfeccLYsJw1Mp/A+V1bqe7KQNg8N6Jk6pmBAT3KRoYmzTS3PTuckzz0vBnmKDJsnSVaErodOtXYkGCHmVtyN1OWNPevu+szkWVsSfK582mE9dSgZPubbHOxUx1JQjELs4BA7eN8hrKgdl+VhCeoJV8lCmEhtdFEz1BuJkLIubGkRe2d064kWwRJ5e6tiKX1smxIJE/akAmitWfLJgL1D12WeCteI5s1gU843GTGJWryk8kUVoofGIHAHPonUEj4cFCV9KdgHtVN2hOnUUkAt5Bu1AgEvap/PEAdlnqbbJPtvJ53tqOk5fRbolYe+L4ai4LL2uehaEQnKm1W55JbjyudxIJZnaTQWIOWMA4oGPDPZooPoo4+D8dYi2LRCXSHN/o3gT/eyrZW7fIDzh26iXhmLJsDvo0qES0AqVASa4jGoyHKK2HDhiUZmMvOrttAwmnUO+e2vh3prxAE93gmOBlExV28JL+5Kt/hURiN9Rg89gFRqngp9pHVZJTVlDtsQYLSA3/o8ehFUoCpaFlBj6IpKl23A413b2W0W3p/F/m7a9Cslfef2MIQNc7g5vZ3gAsIveqJImdecolIzpakGmWQl4Ftw51oGX9SUrilORhwhWjA29+B4EQfKp98RCw2SeOMZ187PAtxkK2fsPwHGs+yAeowQCkuXanX2N0tB7hGygcfgcsh9cjcKGrR86UpCA1D2MZJWJIWaRxV+9MEWD9Qv1P7iIFSBZeqKIIKmsGBWmG2g60nLQPRicaBDSC8Goefrcy01LUxiWLikDbDAvqehBBSyTpmh1jsD/U7IyIRAYjbHHb/sfRpP+e7gk3SEmnwZjSmkChfbPNLH/hKpmyHkgUz+PPLgAnUO9eOWAqN8xGveESRX4YtxLd5LD9uSGaQNdQ/LIwBJFDz2DBwutTPagmxUkMajmTPECekqOjwA4uiXqcEgBnSDZ9zbRV8QVZkVQgHZNMXmzUKVm/I/1v1MoVgylSPsqYAKVRP8eF668IjGNFce4ydKbyXw/q49xATQppc/2RJWPdTPzkOMeZFyCIskOYZY62VDnP1Q8krAH9Z/xhW2oSmEB8F5rYxQQdi40eXV9/BA6mxV0IvYAK9rpxFMcO2Y0Y7tHntSLpejgal+4q1unISx9ZBjaQsXbF8hUnB63u8lv3gN5QpQ1pIOOX41nmBu+4vMRdD/kI78u5rK3UB4MO8fDQoXZru4/WeCH24MMxrfz25A2kirYHfJhRzcDf6GClaydLDq1FsYFKNAxLFmsMe39Nye2XUq6DcoJwoqlRQ9pamYA33Ize0PkmR3yPzeC/xIDzQ27tY6ZD39bY+OIhP+Q2Cw+18Pk/AnPbUG5a56u2VIXTdWdUwD4icoMCrr6OCbbCA/bxtAoHyhJpb5IDooi71lcympTa9GS6DW3BQyhWhtFpOFgXXRuB53sKxFh6BX/Qwgi9eVwmlJX79vhCUKnwVTXEm1uWKFQK63+ZLp2x+P0w3JUs1Xt8vB6NVqd2NRQCqF6sYH+uFnKNJ2ETaScCpgej/8G+aqO5MId5sFA6vWHqRLo6ROK8CNI8DfIkf7LuyHJ3+/mwqxYSWrXW0PmL1K96uvMeljDGe3QCp5zVWQscOTdKTLvpx2CtgZ051S7Pxe19vMZZiHy0vfWCOP+MOL7GS7uCD030MPRoIHozCTgEBuvKMlyePpK4B85iPm9oaOfob3qnxXOnTCrPTT73+glHYwYfA+sOFV/UgFXPFC6COi5zlCbpkhv2IpypmStXc6edeTs9qvJ6/JAK8GPS5wjoq5HdXDnBMEGPN+Ex1sd3LHz9HH0/h8YljglVMQGY9RTfe+TrGjY18yjXJjj15MLMnP0pfMZCsNL3d5GOFRwzzEesHDy0G3QP02w3PHFExT4JNprD2P/36GTenz2qtcUeXbYmqyYitRyrGw9ORYEeH1MC3RmIjtvflR+yDiCk7xVy2n50As5RDvJnREg8IUqlTLJYOIfO5iuHcHdXz0PXA7RFstBc30u01/kTlMfEQ95HI3g0PAZrVFhVjc3mPn36VOYAz4Rf5JOKY9DTAs41VzAdWMSEWzwAVU50mccnLx+Zn8bvqe0sJPAV/2JF0VIW3YeRExSBbfyBr40LCplHFWHz5uH4RrTpibj9FLuEvnr6Hw6uYhaBiMBpfzMXviFr3WYH5HDZ/FGytanZ4GQCSgq+i4ut6ZqyKrxfLSNbFhxPSS65NkV3KV9r8K/FjEI6p3PRYPUgQ8xuyHz/zcrJ2OMJbL2Z9ZkgK8oS9G98/8OqnLhATu0l/JMbiWch9pT/V4YjHWuz6SZxF4kbP3a++G9AX9/OuXzZV1kI8LuDUb/JMHdPKxuPz7JVpTKvH7fSdO9OBWz1d/JTpvc8vnFW33s9+SblUEdeO2LjPVWtX0uRRbWTTr2J+CaHkkI6d33Uiw4XkEJIfMK0vId7U+2g+vrKodRrscbCVHquw/UOzB5hk8tMr8nWyCGJXzDRY43C5uF7kh33s/b/41tgSkfRlBTCd98ttt0k234P9QU4Y4c2/91JjDpbfdDhVN3z9ntfSGa7XeD5VO8674I+YhaewoqT+/rl2rOf/Mp7tA6No23EmH6usdk7M/wVulG2az5kzH4PES/+gQVDGOEyXi2y+nWFs55m3JIdRvvHGG2+88cYbb7zxxhtvvPHGG+r4Dwv3IjeYyCuHAAAAAElFTkSuQmCC",
//   },
//   {
//     hackathonName: "Hack Wiz 4.0",
//     mainTechStack: "Web",
//     sideTechStack: "ML",
//     imgUrl:
//       "data:image/png;base64,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",
//   },
//   {
//     hackathonName: "Status Code 0",
//     mainTechStack: "Web",
//     sideTechStack: "ML",
//     imgUrl:
//       "https://statuscode0.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fc1456908a1184f22adc73bd9ba0cce15%2Fassets%2Fcover%2F468.png&w=1440&q=100",
//   },
//   {
//     hackathonName: "Smart India Hackathon",
//     mainTechStack: "Web",
//     sideTechStack: "ML",
//     imgUrl:
//       "https://static.toiimg.com/thumb/msid-103068370,width-1280,height-720,resizemode-4/.jpg",
//   },
//   {
//     hackathonName: "Smart India Hackathon",
//     mainTechStack: "Web",
//     sideTechStack: "ML",
//     imgUrl:
//       "https://static.toiimg.com/thumb/msid-103068370,width-1280,height-720,resizemode-4/.jpg",
//   },
//   {
//     hackathonName: "Smart India Hackathon",
//     mainTechStack: "Web",
//     sideTechStack: "ML",
//     imgUrl:
//       "https://static.toiimg.com/thumb/msid-103068370,width-1280,height-720,resizemode-4/.jpg",
//   },
//   {
//     hackathonName: "Smart India Hackathon",
//     mainTechStack: "Web",
//     sideTechStack: "ML",
//     imgUrl:
//       "https://static.toiimg.com/thumb/msid-103068370,width-1280,height-720,resizemode-4/.jpg",
//   },
//   {
//     hackathonName: "Smart India Hackathon",
//     mainTechStack: "Web",
//     sideTechStack: "ML",
//     imgUrl:
//       "https://static.toiimg.com/thumb/msid-103068370,width-1280,height-720,resizemode-4/.jpg",
//   },
//   {
//     hackathonName: "Smart India Hackathon",
//     mainTechStack: "Web",
//     sideTechStack: "ML",
//     imgUrl:
//       "https://static.toiimg.com/thumb/msid-103068370,width-1280,height-720,resizemode-4/.jpg",
//   },
//   {
//     hackathonName: "Smart India Hackathon",
//     mainTechStack: "Web",
//     sideTechStack: "ML",
//     imgUrl:
//       "https://static.toiimg.com/thumb/msid-103068370,width-1280,height-720,resizemode-4/.jpg",
//   },
//   {
//     hackathonName: "Smart India Hackathon",
//     mainTechStack: "Web",
//     sideTechStack: "ML",
//     imgUrl:
//       "https://static.toiimg.com/thumb/msid-103068370,width-1280,height-720,resizemode-4/.jpg",
//   },
//   {
//     hackathonName: "Smart India Hackathon",
//     mainTechStack: "Web",
//     sideTechStack: "ML",
//     imgUrl:
//       "https://static.toiimg.com/thumb/msid-103068370,width-1280,height-720,resizemode-4/.jpg",
//   },
//   {
//     hackathonName: "Smart India Hackathon",
//     mainTechStack: "Web",
//     sideTechStack: "ML",
//     imgUrl:
//       "https://static.toiimg.com/thumb/msid-103068370,width-1280,height-720,resizemode-4/.jpg",
//   },
// ];





const Hackathons = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
      axios
        .get(`https://find0.onrender.com/api/hackathons`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  return (
    <div className="upperSectionHeadings">
      <div className="hackathons">
        <h3>
          <span>Hackathons</span>
        </h3>
        <div className="events">
          {data.map((item, index) => {
            return (
              <HCard
                key={index}
                hackathonName={item.hackathonName}
                mainTechStack={item.mainTechStack}
                sideTechStack={item.sideTechStack}
                imgUrl={item.imgUrl}
                link={item.link}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Hackathons
