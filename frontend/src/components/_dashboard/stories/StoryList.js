import PropTypes from 'prop-types';
// material
import { Grid } from '@material-ui/core';
import StoryCard from './StoryCard';

// ----------------------------------------------------------------------

StoryList.propTypes = {
  stories: PropTypes.array.isRequired
};

export default function StoryList({ stories, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {stories.map((story) => (
        <Grid key={story.id} item xs={12} sm={6} md={3}>
          <StoryCard story={story} />
        </Grid>
      ))}
    </Grid>
  );
}
