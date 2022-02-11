import{gql, GraphQLClient} from 'graphql-request'
import Link from 'next/Link'
import Section from '../components/Section'
import Video from './video/[slug]'
import Navbar from '../components/NavBar'



export const getStaticProps = async ()=>{
  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url,{
    headers:{
      "Authorization": process.env.GRAPH_CMS_TOKEN
    }
  })


const videosQuery = gql`
query {
    videos{
      createdAt,
      id,
      title,
      description,
      seen,
      slug,
      tags,
      thumbnail{
        url
      }
      mp4{
        url
      }
    }
  }
  `

const accountQuery = gql`
query{
  account(where:{id:"ckz5vzmo8hjzd0a24x4fnuw7b"}) {
    username,
    avatar {
      url
    }
  }
}
`
const data = await graphQLClient.request(videosQuery)
const videos = data.videos
const accountData = await graphQLClient.request(accountQuery)
const account = accountData.account

return{
  props:{
    videos,
    account
    }
  }
}



const Home =({videos,account}) =>{
  const randomVideo = (videos)=>{
    return videos[Math.floor(Math.random()*videos.length)]
  }

  const filterVideos=(videos,genre)=>{
    return videos.filter((video) => video.tags.includes(genre))
  }

  const unSeenVideos = (videos) => {
    return videos.filter(video => video.seen == false || video.seen == null)
}


  return (
  <>
    <Navbar account = {account}/>

    <div className = "app">
      <div className ="main-video">
        
        <img src={randomVideo(videos).thumbnail.url}
          alt = {randomVideo(videos).title}/>

      </div>
      


      <div className ="video-feed">
        
        <Section genre={'Recommended for you'} videos={unSeenVideos(videos)} />
        <Section genre={'Adventure'} videos={filterVideos(videos,'Adventure')} />
        <Section genre={'Fantasy'}  videos={filterVideos(videos,'Fantasy')}/>
        <Section genre={'Drama'} videos={filterVideos(videos,'Drama')}/>
        <Section genre={'Comedy'} videos={filterVideos(videos,'Comedy')}/>
  
      </div>
    </div>



  </>
  )
}

export default Home