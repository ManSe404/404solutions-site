import { getCollection, type CollectionEntry } from 'astro:content';
import { featuredProjects } from '../data/work';

export type Project = CollectionEntry<'projects'>;

/** Every delivered project, in the portfolio's order. */
export async function projects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

/** The projects Scout names as examples, in the order `featuredProjects` lists them. */
export async function featured(): Promise<Project[]> {
  const all = await projects();
  return featuredProjects.map((id) => {
    const project = all.find((entry) => entry.id === id);
    if (!project) throw new Error(`featuredProjects names "${id}", which is not in src/content/projects/`);
    return project;
  });
}
