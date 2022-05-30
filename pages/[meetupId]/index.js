import { MongoClient, ObjectId } from 'mongodb'
import { Fragment } from 'react'
import Head from 'next/head'
import MeetupDetail from '../../components/meetups/MeetupDetail';

function DetailsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description'
          content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>


  );
}

// getStaticPaths  is a function  ,which you need in dynamic pages to tell NextJS
// for which dynamic parameter values this page should be pre-generated.
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://Jihana:Jihaan%40123@cluster0.xi6vh.mongodb.net/meetups?retryWrites=true&w=majority')

  const db = client.db();
  const meetsupCollection = db.collection('meetups');
  const meetups = await meetsupCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    //If you set fall back to false,you say that your paths contains all supported meetup ID values.
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() }
    }))
    // paths: [
    //   {
    //     params: {
    //       meetupId: 'm1',
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: 'm2',
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    'mongodb+srv://Jihana:Jihaan%40123@cluster0.xi6vh.mongodb.net/meetups?retryWrites=true&w=majority')

  const db = client.db();
  const meetsupCollection = db.collection('meetups');

  const selectedMeetup = await meetsupCollection.findOne({ _id: ObjectId(meetupId) });


  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      }
    },
  };
}

export default DetailsPage